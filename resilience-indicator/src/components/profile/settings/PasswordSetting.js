import { useState } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, TextField,
} from '@mui/material';
import Axios from 'axios';
import { errorAlert, successAlert } from '../../../resources/swal-inl';

const PasswordSetting = function PasswordSettingFunc(props) {
  const [values, setValues] = useState({
    password: '',
    confirm: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onClick = (event) => {
    event.preventDefault();

    // no empty passwords
    if (values.password === '' && values.confirm === '') {
      errorAlert('No empty passwords');
      return;
    }

    // verify password and confirm password matches
    if (values.password !== values.confirm) {
      errorAlert("Passwords don't match");
      return;
    }

    const body = {
      password: values.password,
    };

    Axios({
      method: 'POST',
      data: body,
      withCredentials: true,
      url: '/api/change-password',
    })
      .then((res) => {
        if (res.status === 200) {
          successAlert('Password updated successfully!');
        } else {
          errorAlert('Unabel to update password');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error');
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
        </Box>
      </Card>
    </form>
  );
};

export default PasswordSetting;
