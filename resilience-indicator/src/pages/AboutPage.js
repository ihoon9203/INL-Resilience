import React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import {
  Button, Card, CardMedia, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import useStyles from '../styles';

const AboutPage = function AboutPageFunc() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Card>
        <CardMedia
          component="img"
          image="./assets/EnergyInnovationLab.jpg"
          title="Public Health"
          alt="Energy Innovation Lab at Sunset"
          style={{ height: '35vw' }}
        />
      </Card>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={8}>
          <Typography
            className="title"
            variant="h3"
            align="center"
            color="primary"
            style={{
              paddingTop: '40px',
            }}
          >
            INL Personal Resilience Mission
          </Typography>
          <Box className={classes.divider2} />
        </Grid>
        <Grid item md={6} style={{ margin: '40px' }}>
          <Typography className="display-text" component="span" variant="body1">
            Idaho National Laboratories is working towards a safer America.
            Advancing resilience is a long-term process, but can be coordinated around visible,
            short-term goals that allow individuals and organizations to measure or mark their
            progress toward becoming resilient and overcoming these gaps.
            <br />
            <br />
            Individual resilience involves behaviors, thoughts, and actions that promote personal
            wellbeing and mental health. People can develop the ability to withstand, adapt to, and
            recover from stress and adversity—and maintain or return to a state of mental health
            wellbeing—by using effective coping strategies.
            <br />
            <br />
          </Typography>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: '40px', marginLeft: '40px', alignitems: 'right' }}>
        <Link className="review-survey-button" to="/home">
          <Button className="button" variant="contained" color="primary">
            Return Home
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default AboutPage;
