const primaryBlue = "#3A8DFF";

const formControl = {
  width: "100%",
  marginBottom: "12px",
  "& input": {
    "&:focus": {
      borderBottom: primaryBlue,
    },
  },
};
const form = {
  width: "100%",
  "& .MuiFormControl-root": formControl,

};

const formButton__container = {
  width: "100 %",
  marginTop: "38px",
  display: "flex",
  justifyContent: "center",
};
const formButton = {
  width: "160px",
  height: "56px",
  borderRadius: "3px",
  background: primaryBlue,
  color: "white",
};

module.exports = {
  form, formButton__container, formButton
}