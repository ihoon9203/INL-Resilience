/**
 * Modified version of https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js
 */
import * as React from 'react';
import { useState } from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Container, Typography, Snackbar, Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';

const theme = createTheme();

const SignUp = function SignUpFunc() {
  const [alert, setAlert] = useState({
    message: '',
    severity: 'error',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const showToast = (message, severity) => {
    setAlert({ message, severity });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const creds = {
      username: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    // no empty username
    if (creds.username === '') {
      showToast('Must supply a username', 'error');
      return;
    }

    // no empty password
    if (creds.password === '') {
      showToast('Must supply a non-empty password', 'error');
      return;
    }

    Axios({
      method: 'POST',
      data: creds,
      withCredentials: true,
      url: '/api/register',
    })
      .then((res) => {
        // redirect to login page upon success
        if (res.status === 201) {
          window.location = '/login';
        }
      })
      .catch((err) => {
        console.log(err);
        showToast('Username already exists!', 'error');
      });
  };

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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert variant="filled" elevation={6} onClose={handleSnackbarClose} severity={alert.severity} sx={{ width: '100%' }}>
                {alert.message}
              </Alert>
            </Snackbar>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
