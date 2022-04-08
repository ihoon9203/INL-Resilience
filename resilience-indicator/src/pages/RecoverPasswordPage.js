import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar, Button, CssBaseline, TextField, Grid, Box, Container, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import PasswordResetExpiryPage from './PasswordResetExpiryPage';
import { errorAlert, successAlert } from '../resources/swal-inl';

const theme = createTheme();

const RecoverPasswordPage = function RecoverPasswordPageFunc() {
  const { resetToken } = useParams();

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const body = {
      resetToken,
    };

    Axios({
      method: 'POST',
      data: body,
      url: '/api/validate-reset-token',
    })
      .then((res) => {
        if (res.status === 200) {
          setValidated(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const creds = {
      password: event.currentTarget.password.value,
      confirm: event.currentTarget.confirmPassword.value,
    };

    // no empty username
    if (creds.password === '') {
      errorAlert('Must supply a password');
      return;
    }
    // no empty password
    if (creds.confirm === '') {
      errorAlert('Must confirm password');
      return;
    }
    if (creds.password !== creds.confirm) {
      errorAlert('Passwords must match');
      return;
    }

    // submit password reset
    const body = {
      password: creds.password,
      resetToken,
    };

    Axios({
      method: 'POST',
      data: body,
      url: '/api/reset-password',
    })
      .then((res) => {
        // redirect to login page upon success
        if (res.status === 200) {
          successAlert('Password reset! Now you can sign in.')
            .then(() => {
              window.location = '/login';
            });
        }
      })
      .catch((err) => {
        console.log(err);
        errorAlert('Error trying to reset password');
      });
  };

  if (validated) {
    return (
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          style={{
            paddingBottom: '300px',
            paddingTop: '200px',
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="confirm-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset Password
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
  return (
    <PasswordResetExpiryPage />
  );
};

export default RecoverPasswordPage;
