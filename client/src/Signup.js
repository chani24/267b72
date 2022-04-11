import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import AuthPagesWrapper from './components/Auth/AuthPagesWrapper';
import CustomForm from "./components/Auth/CustomForm";
import RightSide from './components/Auth/RightSide'

const Signup = ({ user, register }) => {
  const history = useHistory();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    await register({ username, email, password });
  };

  const Form = ({classes}) => {
    return (
      <form onSubmit={handleRegister} className={classes.form}>
        <Grid>
          <Grid>
            <FormControl>
              <TextField
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl>
              <TextField
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
              />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl error={!!formErrorMessage.confirmPassword}>
              <TextField
                aria-label="password"
                label="Password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl error={!!formErrorMessage.confirmPassword}>
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Box className={classes.formButton__container}>
            <Button type="submit" className={classes.formButton}>
              Create
            </Button>
          </Box>
        </Grid>
      </form>
    );
  }

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <AuthPagesWrapper>
      <RightSide
        notice={{
          text: "Already have an account ?",
          buttonText: "Login",
          link: "/login",
        }}
        heading="Create an account."
      >
        <CustomForm>
          <Form></Form>
        </CustomForm>
      </RightSide>
    </AuthPagesWrapper>
  );
};

export default CustomForm(Signup);
