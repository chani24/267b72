import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import AuthPagesWrapper from './components/Auth/AuthPagesWrapper';
import RightSide from './components/Auth/RightSide';
import { form, formButton, formButton__container } from './styles/components/AuthPages';

const useStyles = makeStyles({
  form,
  formButton,
  formButton__container,
  forgotPasswordLink : {
  position: "absolute",
  right: 0,
  bottom: "24px",
  fontSize: "12px",
  color: "#3A8DFF",
}
});
const Login = ({ user, login }) => {
    const classes = useStyles();
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    await login({ username, password });
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <AuthPagesWrapper>
        <RightSide notice={{text: 'Don\'t have an account?', buttonText: 'Create account', link: '/register'}} heading='Welcome back!'>
        <form onSubmit={handleLogin} className={classes.form}>
          <Grid>
            <Grid>
              <FormControl margin="normal" required>
                <TextField
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                />
              </FormControl>
            </Grid>
            <FormControl margin="normal" required>
              <TextField
                label="password"
                aria-label="password"
                type="password"
                name="password"
              />
              <a className={classes.forgotPasswordLink}>Forgot?</a>
            </FormControl>
            <Grid>
              <Box className={classes.formButton__container}><Button type="submit" className={classes.formButton}>
                Login
              </Button></Box>
              
            </Grid>
          </Grid>
        </form></RightSide>
    </AuthPagesWrapper>
    
  );
};

export default Login;
