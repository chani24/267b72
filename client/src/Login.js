import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import AuthPagesWrapper from './components/AuthPagesWrapper';

const Login = ({ user, login }) => {
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
     <Grid container justifyContent="center">
      
        <Grid className="top-nav" container item>
          <Typography>Don't have an account?</Typography>
          <Link href="/register" to="/register">
            <Button>Create account</Button>
          </Link>
        </Grid>
        <div className="main">
        <Typography variant="h5" component="h2">
            Welcome back!
</Typography>
        <form onSubmit={handleLogin}>
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
              <a className="forgot-password-link">Forgot?</a>
            </FormControl>
            <Grid>
              <div className="button-container"><Button type="submit">
                Login
              </Button></div>
              
            </Grid>
          </Grid>
        </form></div>
    </Grid> 
    </AuthPagesWrapper>
    
  );
};

export default Login;
