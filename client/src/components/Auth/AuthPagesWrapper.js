import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import chatImage from "../../assets/images/chat.svg";
import background from "../../assets/images/side-banner.png";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme=>({
  authWrapper: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    display: "flex",
    overflow: "hidden",
  },

  authWrapper__left: {
    flex: "0 0 auto",
    width: "40%",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "199px",
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
  },

  authWrapperLeft__h1: {
    margin: "0 80px",
    marginTop: "39.5px",
    color: "white",
    textAlign: "center",
  },
  authWrapper__right: {
    flex: "0 0 auto",
    height: "100vh",
    width: "60%",
    "@media (max-width: 425px)": {
      width: "100%",
    },
  },
}));

const Wrapper = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.authWrapper}>
      <Box className={classes.authWrapper__left}>
        <img src={chatImage} alt="chat icon" />
        <Typography variant="h5" component="h1" className={classes.authWrapperLeft__h1}>
          Converse with anyone with any language
        </Typography>
      </Box>
      <Box className={classes.authWrapper__right}>{children}</Box>
    </Box>
  );
};

export default Wrapper;
