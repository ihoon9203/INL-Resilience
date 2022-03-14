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
} from '@mui/material';
import Axios from 'axios';
import { errorAlert, successAlert } from '../../../resources/swal-inl';

const AccountSetting = function AccountSettingFunc(props) {
  const [user, setUser] = useState({
    email: '',
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

  const handleUpdate = (event) => {
    event.preventDefault();

    // no empty email
    if (user.email === '') {
      errorAlert('Email must not be empty');
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
          successAlert('Email updated successfully!');
        } else {
          errorAlert('Unable to update email');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error');
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
