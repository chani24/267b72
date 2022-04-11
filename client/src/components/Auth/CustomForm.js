import React from "react"
import { makeStyles } from "@material-ui/core/styles";

const primaryBlue = "#3A8DFF";
const useStyles = makeStyles({
  form: {
    width: "100%",
    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: "12px",
      "& input": {
        "&:focus": {
          borderBottom: primaryBlue,
        },
      },
    },
  },
  formButton: {
    width: "160px",
    height: "56px",
    borderRadius: "3px",
    background: primaryBlue,
    color: "white",
  },
  formButton__container: {
    width: "100 %",
    marginTop: "38px",
    display: "flex",
    justifyContent: "center",
  },
  forgotPasswordLink: {
    position: "absolute",
    right: 0,
    bottom: "24px",
    fontSize: "12px",
    color: "#3A8DFF",
  },
});
const CustomForm = ({ children }) => {
  const classes = useStyles()
  
  return (
    <>{React.cloneElement(children, { classes: classes })}</>)
};

export default CustomForm;
