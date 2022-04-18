import React, { useState, useEffect } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import PreviewImage from "./PreviewImage";
import { makeStyles } from "@material-ui/core/styles";
import cameraImage from "../../assets/images/camera.png";
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
  imageStyle: {
    height: "32px",
    width: "32px",
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translate(0, -70%)",
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
    const previewURLs = []
    for (let i = 0; i < selectedFiles.length; i++) {
      const objectUrl = URL.createObjectURL(selectedFiles[i]);
      previewURLs.push(objectUrl)
     }
    setPreview(previewURLs);

    return () => {previewURLs.forEach((url)=>URL.revokeObjectURL(url))};
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
      setSelectedFiles([]);
      return;
    }
    setSelectedFiles(e.target.files);
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

    const url = await uploadImage();
    if (url) reqBody.attachments = [...url];

    await postMessage(reqBody);
    setText("");
    setSelectedFiles([]);
  };

  const uploadImage = async() => {
    if (selectedFiles.length < 1) return null;
    
    const urls = []
    for (let i = 0; i < selectedFiles.length; i++) {
    const formData = new FormData();
    formData.append("file", selectedFiles[i]);
    formData.append("upload_preset", "ynb4jbls");

    
   await fetch("https://api.cloudinary.com/v1_1/ddkuhs8ax/auto/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => urls.push(data.url))
      .catch((err) => console.log(err));
     }

    return urls
  };

  const removeImagePreview = (index) => {
    const previewClone = [...preview]
    previewClone.splice(index, 1)
    setPreview(previewClone)
  }

  return (
    <form className={classes.root}>
      {preview.length >= 1 &&  preview.map((url, index) => {
            return (
              <PreviewImage key={index} url={url} onClose={() => removeImagePreview(index)} />
            )
          
        })
        
      }
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
          src={cameraImage}
          className={classes.imageStyle}
          onClick={() => {
            imageInput.click();
          }}
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
