import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Axios from 'axios';
import NotFoundPage from './NotFoundPage';
import Gauge from '../components/Gauge';
import TimeseriesCategorical from '../components/TimeseriesCategorical';
import surveyDescriptions from '../resources/survey-descriptions';
import SharePanel from '../components/SharePanel';
import useStyles from '../styles';
import '../styles/description.css';

const DescriptionPage = function DescriptionPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const [score, setScore] = useState(0);
  const [scoreSeries, setScoreSeries] = useState([]);
  const [mobileButton, setMobileButton] = useState('');
  const [hasTakenSurvey, setHasTakenSurvey] = useState(false);
  const [mobileView, setMobileView] = useState({ justifyContent: 'flex', margin: '40px', class: '' });

  const survey = surveyDescriptions.find((s) => s.name === name);
  if (!survey) return <NotFoundPage />;

  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobileButton('mobile-button');
      setMobileView({ margin: '0', class: 'center-horizontal' });
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
    Axios
      .get(`/api/user-score/${survey.name}`, { withCredentials: true })
      .then((res) => {
        setScoreSeries(res.data);
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
          <Gauge id="gauge" score={score} style={{ width: '100%', height: '500px' }} size={60} />
        </div>
        <div className="column" style={{ paddingBottom: '40px' }}>
          <h3>
            Resiliency Progress
          </h3>
          <TimeseriesCategorical score={scoreSeries} category={survey.title} />
          <Grid container spacing={1} justifyContent="center" alignItems="center">
            <Grid item xs={5}>
              <Link style={hasTakenSurvey ? {} : { pointerEvents: 'none' }} className="review-survey-button" to={`/improvement-plan/${survey.name}`}>
                <button
                  type="button"
                  className={`improvment-plan ${mobileButton}`}
                  disabled={!hasTakenSurvey}
                >
                  IMPROVEMENT PLAN
                </button>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <button
                type="button"
                className={`improvment-plan ${mobileButton}`}
                disabled={!hasTakenSurvey}
              >
                GOALS
              </button>
            </Grid>
            <Grid item xs={5}>
              <Link className="review-survey-button" to={`/take-survey/${survey.name}`} state={{ shouldUpdate: true }}>
                <button type="button" className={`take-survey ${mobileButton}`}>UPDATE SURVEY</button>
              </Link>
            </Grid>
            <Grid item xs={5}>
              <Link className="review-survey-button" to={`/review-survey/${survey.name}`}>
                <button type="button" className={`update-survey ${mobileButton}`}>REVIEW SURVEY</button>
              </Link>
            </Grid>
          </Grid>
        </div>
      </section>
      <Grid item style={{ marginTop: '40px', marginLeft: mobileView.margin, alignitems: 'right' }}>
        <Link className="review-survey-button" to="/home">
          <Button className={`button ${mobileView.class}`} variant="contained" color="primary">
            Return Home
          </Button>
        </Link>
      </Grid>
      <SharePanel score={score} surveyName={survey.name.toUpperCase()} />
    </>
  );
};

export default DescriptionPage;
