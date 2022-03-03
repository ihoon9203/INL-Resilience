import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button, Box, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import NotFoundPage from './NotFoundPage';
import AnswerList from '../components/AnswerList';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';

const ReviewSurveyPage = function ReviewSurveyPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);

  const [surveyAnswers, setSurveyAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/survey-answers/${name}`);
      const body = await result.json();
      console.log('Answers object:');
      console.log(body);
      setSurveyAnswers(body);
    };
    fetchData().catch((err) => console.log(err));
  }, [name]);
  if (!survey || surveyAnswers.length === 0) return <NotFoundPage />;

  return (
    <>
      <CssBaseline />
      <Typography
        variant="h4"
        align="center"
        color="primary"
        style={{ width: '100%', height: '90%' }}
      >
        {survey.title}
        {' '}
        Review Survey
      </Typography>
      <Box className={classes.divider2} />
      <container>
        <AnswerList answers={surveyAnswers} />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={4} md={5}>
            <Link className="review-survey-button" to={`/take-survey/${survey.name}`}>
              <Button
                className={classes.button}
                variant="contained"
                color="testsecondary"
              >
                Retake Survey
              </Button>
            </Link>
          </Grid>
          <Grid item xs={4} md={4}>
            <Link to="../home">
              <Button className={classes.button} variant="contained" color="primary">
                Back to Home
              </Button>
            </Link>
          </Grid>
        </Grid>
      </container>
    </>
  );
};

export default ReviewSurveyPage;
