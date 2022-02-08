/*
 * 12/07/2021
 * Description page for each survey category. This displays the current score
 * for this survey, as well as a description of the category. The survey, personal improvement
 * plan, and achievements/goals page can be accessed from here.
 */
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { Container } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import MilestoneBar from '../components/MilestoneBar';
import NotFoundPage from './NotFoundPage';
import Gauge from '../components/Gauge';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';

const DescriptionPage = function DescriptionPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);
  if (!survey) return <NotFoundPage />;
  useEffect(() => {
    if (window.innerWidth < 800) {
      console.log('got here');
      const voidspace = document.querySelector('.empty-space-2');
      console.log(voidspace.display);
      voidspace.style.display = 'none';
    }
  });
  return (
    <>
      <Typography color="primary" variant="h3" id="description-title">
        {survey.title}
      </Typography>
      <section className="columns center-column">
        <div className="column">
          <h3>Category Score</h3>
          <Gauge score={60} style={{ width: '100%', height: '500px' }} size={60} />
        </div>
        <div className="column small-column">
          <div className="empty-space-2" />
          <Typography id="milestone-progress-title">
            {' '}
            Progress to next milestone:
          </Typography>
          <Container className="panel">
            <Link to="."><MilestoneBar className="panel-item health milestone" category={survey.title} score={60} /></Link>
          </Container>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link className="take-survey-button" to={`/take-survey/${survey.name}`}>
                <Button
                  className={classes.featureButtons}
                  variant="contained"
                  color="primary"
                >
                  Plan
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={classes.featureButtons}
                variant="contained"
                color="primary"
              >
                Goals
              </Button>
            </Grid>
          </Grid>
        </div>
      </section>
      <section className="columns center-column">
        <div className="column center-column">
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link className="take-survey-button" to={`/take-survey/${survey.name}`}>
                <Button
                  className={classes.surveyButtons}
                  variant="contained"
                  color="primary"
                >
                  Take Survey
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Link className="review-survey-button" to={`/review-survey/${survey.name}`}>
                <Button
                  className={classes.surveyButtons}
                  variant="contained"
                  color="primary"
                >
                  Review Survey
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </section>
      <Typography id="description">{survey.description}</Typography>
    </>
  );
};

export default DescriptionPage;
