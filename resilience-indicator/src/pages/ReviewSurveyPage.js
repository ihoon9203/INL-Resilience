import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import {
  Button, Box, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import Gauge from '../components/Gauge';
import NotFoundPage from './NotFoundPage';
import AnswerList from '../components/AnswerList';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';

const ReviewSurveyPage = function ReviewSurveyPageFunc() {
  const componentRef = React.useRef(null);

  const classes = useStyles();
  const { name } = useParams();
  const { state } = useLocation();

  const survey = surveyDescriptions.find((s) => s.name === name);
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [showNotFound, setNotFound] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [score, setScore] = useState(0);

  const getPageMargins = () => '@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 20mm !important }}';

  const reactToPrintTrigger = React.useCallback(() => (
    <Button className={classes.button} variant="contained" color="default">
      Download
    </Button>
  ), []);

  const reactToPrintContent = React.useCallback(() => componentRef.current, [componentRef.current]);

  useEffect(() => {
    if (state === null) {
      // logged-in user
      setLoggedIn(true);
      const fetchData = async () => {
        const result = await fetch(`/api/survey-answers/${name}`);
        const body = await result.json();
        if (body.length === 0) {
          setNotFound(true);
        }
        setSurveyAnswers(body);
      };
      const fetchScore = async () => {
        const result = await fetch(`/api/score/${name}`);
        const body = await result.json();
        setScore(body.score);
      };
      fetchData().catch((err) => console.log(err));
      fetchScore().catch((err) => console.log(err));
    } else {
      // guest user
      setLoggedIn(false);
      const fetchData = async () => {
        const result = await fetch(`/api/survey-questions-guest/${name}`);
        const body = await result.json();
        if (body.length === 0) {
          setNotFound(true);
        }
        const formattedSurveyAnswers = [];
        body.forEach((q) => {
          const userAnswer = state.userAnswers.find((a) => a.questionId === q.id);
          formattedSurveyAnswers.push({
            answer: userAnswer.answer,
            Question: q,
          });
        });
        setSurveyAnswers(formattedSurveyAnswers);
        setScore(parseInt(state.userScore));
      };
      fetchData().catch((err) => console.log(err));
    }
  }, [name]);

  if (!survey || showNotFound) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div ref={componentRef}>
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
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={4} md={2} style={{ paddingRight: '20px' }}>
            <h3 className="text-center">Your Resilience Score</h3>
          </Grid>
          <Grid item xs={4} md={2}>
            <Gauge
              score={score}
              style={{
                width: '100%',
                height: '300px',
              }}
              size={60}
            />
          </Grid>
        </Grid>
        <Box className={classes.divider2} style={{ marginBottom: '50px' }} />
        <AnswerList answers={surveyAnswers} />
      </div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={4} md={2}>
          <Link className="review-survey-button" to={`/take-survey/${survey.name}`}>
            <Button
              className={classes.button}
              variant="contained"
              style={{
                backgroundColor: 'green',
                color: 'white',
              }}
            >
              Retake Survey
            </Button>
          </Link>
        </Grid>
        <Grid item xs={4} md={2}>
          <Link className="review-survey-button" to="../home">
            <Button className={classes.button} variant="contained" color="primary">
              Back to Home
            </Button>
          </Link>
        </Grid>
        {loggedIn && (
          <Grid item xs={4} md={2}>
            <Link className="review-survey-button" to={`/improvement-plan/${survey.name}`}>
              <Button
                className={classes.button}
                variant="contained"
                style={{
                  backgroundColor: 'rgb(247, 68, 68, 0.30)',
                }}
              >
                Improvement Plan
              </Button>
            </Link>
          </Grid>
        )}
        <Grid item xs={4} md={2}>
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle={`${name}-survey-results`}
            removeAfterPrint
            trigger={reactToPrintTrigger}
            pageStyle={getPageMargins}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewSurveyPage;
