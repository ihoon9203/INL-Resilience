import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Button, Container, Grid, Typography,
} from '@mui/material';
import Axios from 'axios';
import ProfileSettingNav from '../components/profile/ProfileSettingNav';
import ProfileSettingPicker from '../components/profile/ProfileSettingPicker';
import NotFoundPage from './NotFoundPage';
import '../styles/description.css';

const ProfilePage = function ProfilePageFunc() {
  const [setting, setSetting] = useState('Account');
  const [loggedIn, setLoggedIn] = useState(false);
  const [mobileView, setMobileView] = useState({ justifyContent: 'flex', margin: '40px', class: '' });

  const handleSettingChange = (newSetting) => {
    setSetting(newSetting);
  };

  useEffect(() => {
    Axios
      .get('/api/logged-in', { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setLoggedIn(res.data.loggedIn);
        }
      });
  }, []);
  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobileView({ margin: '0', class: 'center-horizontal' });
    }
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
            Settings
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
          <Grid item style={{ marginTop: '40px', marginLeft: mobileView.margin, alignitems: 'right' }}>
            <Link className="review-survey-button" to="/home">
              <Button className={`button ${mobileView.class}`} variant="contained" color="primary">
                Return Home
              </Button>
            </Link>
          </Grid>
        </Container>
      </Box>
    );
  }
  return <NotFoundPage />;
};

export default ProfilePage;
