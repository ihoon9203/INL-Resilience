import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {
  Box, Card, CardMedia, Grid,
} from '@mui/material';
import useStyles from '../styles';

const INLCarousel = function INLCarouselFunc() {
  const classes = useStyles();

  return (
    <div style={{ marginBottom: '50px' }}>
      <Carousel
        className="INLCarousel"
        autoPlay
        stopAutoPlayOnHover
        cycleNavigation
        duration="1000"
        interval="70000"
        navButtonsProps={{
          style: {
            backgroundColor: '#808080',
            margin: '0px 20px 0px 20px',
          },
        }}
        navButtonsWrapperProps={{
          style: {
            bottom: '0',
            top: 'unset',
          },
        }}
        indicatorContainerProps={{
          style: {
            Margin: '200px',
            Padding: '200px',
          },
        }}
      >
        <Grid item>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="600"
                image="./assets/satellites.jpg"
                title="Cyber Security"
                alt="Satellites with blue sky background"
              />
              <Box className={classes.carouselBackground} sx={{ borderRadius: '50%' }}> </Box>
              <Box className={classes.carouselBox}>
                <p className={classes.carouselTitle} style={{ fontSize: '80px' }}>Cyber Security</p>
                <p className={classes.carouselText} style={{ maxWidth: '500px' }}>
                  Over 50% of all consumers have experienced a cybercrime.
                  Take the Cyber Security Survey and receive your impovement plan to better protect yourself today!
                </p>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="600"
                image="./assets/cyber.png"
                title="Account Creation"
                alt="User logging into online account"
              />
              <Box className={classes.carouselBox}>
                <p className={classes.carouselTitle} style={{ fontSize: '65px' }}>Create an Account</p>
                <p className={classes.carouselText} style={{ maxWidth: '500px' }}>
                  Make sure to create a resilience account to unlock features such as an analysis panel,
                  a personal improvement plan, achieving goals, sharing to social media and more!
                </p>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="600"
                image="./assets/mountain.jpg"
                title="Goals"
                alt="mountain"
              />
              <Box className={classes.carouselBox}>
                <p className={classes.carouselTitle} style={{ fontSize: '65px' }}>Resilience Goals</p>
                <p className={classes.carouselText} style={{ maxWidth: '500px' }}>
                  You can create custom goals or utilize the system goals curated from your improvement plan
                  to increase your resiliency.
                </p>
              </Box>
            </Box>
          </Card>
        </Grid>

        <Grid item>
          <Card>
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="600"
                image="./assets/rocket.jpg"
                title="Improvement Plan"
                alt="Rocket launching off of mars"
              />
              <Box className={classes.carouselBox}>
                <p className={classes.carouselTitle} style={{ fontSize: '65px' }}>Improvement Plan</p>
                <p className={classes.carouselText} style={{ maxWidth: '500px' }}>
                  Complete a survey to receive a personally curated improvement plan to help you
                  launch into a more resilient life today!
                </p>
              </Box>
            </Box>
          </Card>
        </Grid>

      </Carousel>
    </div>
  );
};

export default INLCarousel;
