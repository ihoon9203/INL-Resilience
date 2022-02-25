import { useState } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, Snackbar, TextField, Alert,
} from '@mui/material';
import Axios from 'axios';

const PasswordSetting = function PasswordSettingFunc(props) {
  const [values, setValues] = useState({
    password: '',
    confirm: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [alert, setAlert] = useState({
    message: '',
    severity: 'success',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
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

  const onClick = (event) => {
    event.preventDefault();

    // no empty passwords
    if (values.password === '' && values.confirm === '') {
      showToast('No empty passwords', 'error');
      return;
    }

    // verify password and confirm password matches
    if (values.password !== values.confirm) {
      showToast('Passwords don\'t match', 'error');
      return;
    }

    const body = {
      password: values.password,
    };

    Axios({
      method: 'POST',
      data: body,
      withCredentials: true,
      url: '/api/change_password',
    })
      .then((res) => {
        if (res.status === 200) {
          showToast('Password updated successfully!', 'success');
        } else {
          showToast('Unable to update password', 'error');
        }
      })
      .catch((err) => {
        showToast('Unexpected error', 'error');
        console.log(err);
      });
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onClick}
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
        </Box>
      </Card>
    </form>
  );
};

export default PasswordSetting;
