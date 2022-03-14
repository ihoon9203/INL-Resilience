/**
 * Modified version of: https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in-side/SignInSide.js
 */
import * as React from 'react';
import {
  Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';
import { errorAlert } from '../resources/swal-inl';

const Copyright = function CopyrightFunc(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://resilience.inl.gov/">
        INL Resilience
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
};

const theme = createTheme();

const LoginPage = function LoginPageFunc() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const creds = {
      username: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };
    Axios({
      method: 'POST',
      data: creds,
      withCredentials: true,
      url: '/api/login',
    })
      .then((res) => {
        // redirect to home page upon success
        if (res.status === 200) {
          window.location = res.request.responseURL;
        }
      })
      .catch((err) => {
        console.log(err);
        errorAlert('Incorrect username or password');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid className="login-shift" container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(./assets/resilient.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ marginBottom: 2, marginTop: 10 }}
              >
                Sign In
              </Button>
              <Link href="/home">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  style={{ marginTop: 2, backgroundColor: 'green' }}
                >
                  Continue As Guest
                </Button>
              </Link>
              <Grid container>
                <Grid item xs>
                  {/* TODO: Add this back */}
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    Do not have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LoginPage;
