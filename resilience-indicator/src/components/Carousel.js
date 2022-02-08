import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import {
  Box, Button, Card, CardMedia, Grid, Typography,
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
        interval="7000"
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
                image="./assets/health.png"
                title="Public Health"
                alt="Family in fields"
              />
              <Box
                className={classes.carouselBox}
                bottom="150"
              >
                <Typography variant="h3" color="primary.dark">Public Health</Typography>
                <br />
                <Typography variant="body2" color="primary.dark" maxWidth="400px">
                  Complete the Public Health Survey to view your health index
                  and take steps to improve your Resilience.
                </Typography>
                <Link className="take-survey-button" to="/take-survey/health">
                  <Box component="span" m={2} className={classes.smallbox}>
                    <Button
                      className={classes.carouselButtons}
                      variant="outlined"
                      color="primary"
                      style={{
                        border: '2px solid',
                      }}
                    >
                      Take Survey
                    </Button>
                  </Box>
                </Link>
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
                title="Cyber Security"
                alt="User logging into online account"
              />
              <Box
                className={classes.carouselBox}
                bottom="130px"
                color="white"
              >
                <Typography variant="h3">Cyber Security</Typography>
                <br />
                <Typography variant="body2" maxWidth="400px">
                  Take the Cyber Security Survey to view your cyber index
                  and take steps to improve your Resilience with your own curated Improvement Plan!
                </Typography>
                <Link className="take-survey-button" to="/take-survey/finance">
                  <Box component="span" m={2} className={classes.smallbox}>
                    <Button
                      className={classes.carouselButtons}
                      variant="outlined"
                      style={{
                        border: '2px solid',
                        color: '#ffffff',
                      }}
                    >
                      Take Survey
                    </Button>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Card>
        </Grid>

      </Carousel>
    </div>
  );
};

export default INLCarousel;
