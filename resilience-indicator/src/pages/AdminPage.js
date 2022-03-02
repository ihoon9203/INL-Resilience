import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography,
} from '@mui/material';
import Axios from 'axios';
import AdminNav from '../components/admin/AdminNav';
import AdminPicker from '../components/admin/AdminPicker';
import NotFoundPage from './NotFoundPage';

const AdminPage = function AdminPageFunc() {
  const [pickerValue, setPickerValue] = useState('Feedback');

  const [user, setUser] = useState({
    isAdmin: false,
  });

  const handlePickerValueChange = (newPickerValue) => {
    setPickerValue(newPickerValue);
  };

  useEffect(() => {
    Axios
      .get('/api/logged_in', { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      });
  }, []);

  if (user.isAdmin) {
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Admin ------------
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={3}
              md={6}
              xs={12}
            >
              <AdminNav handlePickerValueChange={handlePickerValueChange} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AdminPicker pickerValue={pickerValue} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
  return <NotFoundPage />;
};

export default AdminPage;
