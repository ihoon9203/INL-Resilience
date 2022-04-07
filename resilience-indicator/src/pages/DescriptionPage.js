import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Axios from 'axios';
import NotFoundPage from './NotFoundPage';
import Gauge from '../components/Gauge';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import '../styles/description.css';

const DescriptionPage = function DescriptionPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const [score, setScore] = useState(0);
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
          setScore(res.data.score);
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
        <div className="column small-column" style={{ paddingBottom: '40px' }}>
          <div className="empty-space-2" />
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={5}>
              <Link style={hasTakenSurvey ? {} : { pointerEvents: 'none' }} className="review-survey-button" to={`/improvement-plan/${survey.name}`}>
                <button
                  type="button"
                  className="improvment-plan"
                  disabled={!hasTakenSurvey}
                >
                  IMPROVEMENT PLAN
                </button>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <button
                type="button"
                className="improvment-plan"
                disabled={!hasTakenSurvey}
              >
                GOALS
              </button>
            </Grid>
            <Grid item xs={5}>
              <button type="button" className="take-survey">UPDATE SURVEY</button>
            </Grid>
            <Grid item xs={5}>
              <Link className="review-survey-button" to={`/review-survey/${survey.name}`}>
                <button type="button" className="update-survey">REVIEW SURVEY</button>
              </Link>
            </Grid>
            <Grid item xs={10}>
              <button type="button" className="download-survey">DOWNLOAD SURVEY RESULTS</button>
            </Grid>
          </Grid>
        </div>
      </section>
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

export default DescriptionPage;
