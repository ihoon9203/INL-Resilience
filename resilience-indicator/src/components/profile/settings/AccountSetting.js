import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import Axios from 'axios';

const AccountSetting = function AccountSettingFunc(props) {
  const [user, setUser] = useState({
    email: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [alert, setAlert] = useState({
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    Axios
      .get('/api/logged_in', { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      });
  }, []);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogout = () => {
    Axios({
      method: 'POST',
      withCredentials: true,
      url: '/api/logout',
    })
      .then((res) => {
        if (res.status === 200) {
          window.location = '/login';
        } else {
          console.log('failed to logout');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const showToast = (message, severity) => {
    setAlert({ message, severity });
    setSnackbarOpen(true);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    // no empty email
    if (user.email === '') {
      showToast('Email must not be empty', 'error');
      return;
    }

    const body = {
      username: user.email,
    };

    Axios({
      method: 'POST',
      data: body,
      withCredentials: true,
      url: '/api/change_username',
    })
      .then((res) => {
        if (res.status === 200) {
          showToast('Email updated successfully!', 'success');
        } else {
          showToast('Unable to update email', 'error');
        }
      })
      .catch((err) => {
        showToast('Unexpected error', 'error');
        console.log(err);
      });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={user.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Button
                color="primary"
                variant="contained"
                sx={{
                  marginTop: 1.5,
                }}
                onClick={handleUpdate}
              >
                Update
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
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            p: 2,
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{
              width: 100,
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountSetting;
