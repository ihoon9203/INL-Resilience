import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography,
} from '@mui/material';
import Axios from 'axios';
import ProfileSettingNav from '../components/profile/ProfileSettingNav';
import ProfileSettingPicker from '../components/profile/ProfileSettingPicker';
import NotFoundPage from './NotFoundPage';

const ProfilePage = function ProfilePageFunc() {
  const [setting, setSetting] = useState('Account');

  const [loggedIn, setLoggedIn] = useState(false);

  const handleSettingChange = (newSetting) => {
    setSetting(newSetting);
  };

  useEffect(() => {
    Axios
      .get('/api/logged_in', { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setLoggedIn(res.data.loggedIn);
        }
      });
  }, []);

  if (loggedIn) {
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
            Settings ------------
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
              <ProfileSettingNav handleSettingChange={handleSettingChange} />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileSettingPicker setting={setting} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
  return <NotFoundPage />;
};

export default ProfilePage;
