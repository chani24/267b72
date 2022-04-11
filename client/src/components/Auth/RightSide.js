import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => (
  {
  topNav: {
    justifyContent: "end",
    padding: "24px",
    alignItems: "center",
    marginBottom: "4rem",
  },
  topNav__p: {
    color: "rgba(176, 176, 176, 1)",
    fontSize: "14px",
    lineHeight: "19px",
  },
  topNav__a: {
    textDecoration: "none",
  },
  topNav__button: {
    width: "140px",
    height: "54px",
    color: "#3A8DFF",
    borderRadius: "5px",
    boxShadow: "0px 2px 12px rgba(74, 106, 149, 0.2);",
    marginLeft: "30px",
  },
  main: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0 160px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 48px",
    },
  },
  main__h2: {
    width: "100%",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "26px",
    lineHeight: "40px",
  },
}));

const Wrapper = ({ children, notice, heading }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center">
      <Grid className={classes.topNav} container item>
        <Typography className={classes.topNav__p}>{notice.text}</Typography>
        <Link to={notice.link} className={classes.topNav__a}>
          <Button className={classes.topNav__button}>
            {notice.buttonText}
          </Button>
        </Link>
      </Grid>
      <Box className={classes.main}>
        <Typography variant="h5" component="h2" className={classes.main__h2}>
          {heading}
        </Typography>
        {children}
      </Box>
    </Grid>
  );
};

export default Wrapper;
