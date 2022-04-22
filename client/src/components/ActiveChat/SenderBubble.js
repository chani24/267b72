import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  image: {
    width: "200px",
    marginLeft: "1rem",
  },
}));

const SenderBubble = ({ time, text, attachments }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {(text !== "" || !attachments?.length < 1) && (
        <Typography className={classes.date}>{time}</Typography>
      )}

      {attachments?.length > 0 && (
        <Box>
          {attachments.map((url, index) => {
            return (
              <img
                src={url}
                key={index}
                className={classes.image}
                alt="attachment"
              />
            );
          })}
        </Box>
      )}
      <Box className={classes.bubble}>
        {text !== "" && (
          <Typography className={classes.text}>{text}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SenderBubble;
