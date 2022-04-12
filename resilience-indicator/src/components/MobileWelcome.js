import React from 'react';
import {
  Box, Card, CardMedia,
} from '@mui/material';
import useStyles from '../styles';

const MobileWelcome = function MobileWelcomeFunc() {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: '50px' }}>
      <Card>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="435"
            image="./assets/laboratory.jpg"
            title="Cyber Security"
            alt="Satellites with blue sky background"
          />
          <Box className={classes.carouselMobileBox}>
            <p className={classes.carouselMobileTitle} style={{ fontSize: '80px' }}>INL Resilience</p>
          </Box>
        </Box>
      </Card>
    </div>
  );
};

export default MobileWelcome;
