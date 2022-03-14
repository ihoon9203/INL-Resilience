import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { Container } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import Axios from 'axios';
import MilestoneBar from '../components/MilestoneBar';
import NotFoundPage from './NotFoundPage';
import Gauge from '../components/Gauge';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';

const DescriptionPage = function DescriptionPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const location = useLocation();
  const { score } = location.state;
  const [hasTakenSurvey, setHasTakenSurvey] = useState(false);

  const survey = surveyDescriptions.find((s) => s.name === name);
  if (!survey) return <NotFoundPage />;

  useEffect(() => {
    if (window.innerWidth < 800) {
      const voidspace = document.querySelector('.empty-space-2');
      voidspace.style.display = 'none';
    }
    Axios
      .get(`/api/score/${survey.name}`, {
        withCredentials: true,
        validateStatus: (status) => status < 500,
      })
      .then((res) => {
        if (res.status === 200) {
          setHasTakenSurvey(true);
        } else if (res.status === 404) {
          setHasTakenSurvey(false);
        }
      });
  }, []);

  return (
    <>
      <Typography
        color="primary"
        variant="h3"
        align="center"
        fontWeight="bolder"
        style={{
          width: '100%', height: '90%', paddingTop: '16px',
        }}
      >
        {survey.title}
      </Typography>
      <Box className={classes.divider2} />
      <section className="columns center-column">
        <div className="column">
          <h3>Category Score</h3>
          <Gauge score={score} style={{ width: '100%', height: '500px' }} size={60} />
        </div>
        <div className="column small-column">
          <div className="empty-space-2" />
          <Typography id="milestone-progress-title">
            {' '}
            Progress to next milestone:
          </Typography>
          <Container className="panel">
            <Link to=".">
              <MilestoneBar className="panel-item health milestone" category={survey.title} score={score} />
            </Link>
          </Container>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Link style={hasTakenSurvey ? {} : { pointerEvents: 'none' }} className="review-survey-button" to={`/improvement-plan/${survey.name}`}>
                <Button
                  className={classes.featureButtons}
                  variant="contained"
                  color="primary"
                  disabled={!hasTakenSurvey}
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
                disabled={!hasTakenSurvey}
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
    </>
  );
};

export default DescriptionPage;
