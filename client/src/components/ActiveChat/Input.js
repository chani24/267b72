import React, { useState, useEffect } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import axios from "axios";
import PreviewImage from "./PreviewImage";
import { makeStyles } from "@material-ui/core/styles";
import fileImage from "../../assets/images/file.png";
import emojiImage from "../../assets/images/emoji.png";

const shareImageStyles = {
  height: "24px",
  width: "24px",
  position: "absolute",
  top: "50%",
  transform: "translate(0, -70%)",
};

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  emojiStyle: {
    right: "64px",
    ...shareImageStyles,
  },
  imageStyle: {
    right: "16px",
    ...shareImageStyles,
  },
}));

let imageInput;

const Input = ({ otherUser, conversationId, user, postMessage }) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  useEffect(() => {
    if (selectedFiles.length < 1) {
      setPreview([]);
      return;
    }
    const previewURLs = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const objectUrl = URL.createObjectURL(selectedFiles[i]);
      previewURLs.push(objectUrl);
    }
    setPreview(previewURLs);

    return () => {
      previewURLs.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleClick = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleClick);

    return () => window.removeEventListener("keydown", handleClick);
  });
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const newFiles = [...selectedFiles];
    newFiles.push(...Object.values(e.target.files));
    setSelectedFiles(newFiles);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (text === "" && selectedFiles.length < 1) return;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };

    const urls = await uploadImage(selectedFiles);
    if (urls) reqBody.attachments = [...urls];

    await postMessage(reqBody);
    setText("");
    setSelectedFiles([]);
  };

  const uploadImage = async (selectedFiles) => {
    if (selectedFiles.length < 1) return null;
    const urls = [];
    const uploadedImages = await axios.all(
      selectedFiles.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
        return axios.post(
          "https://api.cloudinary.com/v1_1/ddkuhs8ax/auto/upload",
          formData,
          {
            transformRequest: [
              (data, headers) => {
                delete headers["x-access-token"];
                return data;
              },
            ],
          }
        );
      })
    );

    uploadedImages.forEach((imageData) => {
      urls.push(imageData.data.url);
    });

    return urls;
  };

  const removeImagePreview = (index) => {
    const previewClone = [...preview];
    previewClone.splice(index, 1);
    setPreview(previewClone);
  };

  return (
    <form className={classes.root}>
      {preview.length >= 1 &&
        preview.map((url, index) => {
          return (
            <PreviewImage
              key={url}
              url={url}
              onClose={() => removeImagePreview(index)}
            />
          );
        })}
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <img
          src={emojiImage}
          className={classes.emojiStyle}
          alt="emoji picker"
        />
        <img
          src={fileImage}
          className={classes.imageStyle}
          onClick={() => {
            imageInput.click();
          }}
          alt="file picker"
        />
        <input
          ref={(input) => (imageInput = input)}
          onChange={onSelectFile}
          onKeyDown={uploadImage}
          style={{ display: "none" }}
          type="file"
          id="img"
          name="img"
          accept="image/*"
          multiple
        />
      </FormControl>
    </form>
  );
};

export default Input;
