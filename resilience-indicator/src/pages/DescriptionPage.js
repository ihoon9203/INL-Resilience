/*
 * 12/07/2021
 * Description page for each survey category. This displays the current score
 * for this survey, as well as a description of the category. The survey, personal improvement
 * plan, and achievements/goals page can be accessed from here.
 */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import ProgressBar from 'react-bootstrap/ProgressBar';
import NotFoundPage from './NotFoundPage';
import Gauge from '../components/Gauge';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';

const DescriptionPage = function DescriptionPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);

  if (!survey) return <NotFoundPage />;

  return (
    <>
      <Typography color="primary" variant="h3" id="description-title">
        {survey.title}
      </Typography>
      <Box m={2} className={classes.divider} />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Gauge score={60} style={{ width: '100%', height: '200px' }} />
        </Grid>
        <Grid item xs container direction="column" spacing={2} columnSpacing={1}>
          <Grid item xs={6}>
            <Box component="span" m={2} className={classes.smallbox}>
              <Button
                className={classes.featureButtons}
                variant="contained"
                color="primary"
              >
                Personal Improvement Plan
              </Button>
            </Box>
            <Box component="span" m={2} className={classes.smallbox}>
              <Button
                className={classes.featureButtons}
                variant="contained"
                color="primary"
              >
                Achievements/Goals
              </Button>
            </Box>
            <Box m={1} className={classes.progressbox}>
              <Typography id="milestone-progress-title">
                {' '}
                Progress to next milestone:
              </Typography>
              <ProgressBar now="50" variant="success" />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Link className="take-survey-button" to={`/take-survey/${survey.name}`}>
            <Box component="span" m={2} className={classes.smallbox}>
              <Button
                className={classes.surveyButtons}
                variant="contained"
                color="primary"
              >
                Take Survey
              </Button>
            </Box>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <Link className="review-survey-button" to={`/review-survey/${survey.name}`}>
            <Box component="span" m={2} className={classes.smallbox}>
              <Button
                className={classes.surveyButtons}
                variant="contained"
                color="primary"
              >
                Review Survey
              </Button>
            </Box>
          </Link>
        </Grid>
      </Grid>
      <Typography id="description">{survey.description}</Typography>
    </>
  );
};

export default DescriptionPage;
