import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import ReactToPrint from 'react-to-print';
import {
  Button, Box, CssBaseline, Grid, Typography,
} from '@mui/material';
import Gauge from '../components/Gauge';
import NotFoundPage from './NotFoundPage';
import AnswerList from '../components/AnswerList';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import '../styles/review.css';

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
  const [mobileView, setMobileView] = useState({ justifyContent: 'flex', margin: 'left-margin', spacing: 0 });
  const [mobileState, setMobileState] = useState(false);
  const getPageMargins = () => '@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 20mm !important }}';

  const reactToPrintTrigger = React.useCallback(() => (
    <button type="button" className="review-survey">DOWNLOAD SURVEY</button>
  ), []);

  const reactToPrintContent = React.useCallback(() => componentRef.current, [componentRef.current]);

  useEffect(() => {
    if (window.innerWidth < 821) { // ipad air width
      setMobileView({ justifyContent: 'center', margin: '', spacing: '80' });
      setMobileState(true);
    }
    if (window.innerWidth < 600) { // ipad air width
      setMobileView({ justifyContent: 'center', margin: '', spacing: '0' });
    }
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
          color="primary"
          variant="h3"
          align="center"
          fontWeight="bolder"
          style={{
            width: '100%', height: '90%', paddingTop: '16px',
          }}
        >
          {survey.title}
          {' '}
          Review Survey
        </Typography>
        <Box className={classes.divider2} />
        <Grid container className={classes.reviewScore} justifyContent="center" alignItems="center" columnSpacing={mobileView.spacing} margin="auto">
          <h3 className="text-center-review">Resilience Score:</h3>
          { mobileState ? <div /> : <Grid item style={{ padding: '20px', minWidth: '300px' }} /> }
          <Grid item>
            <Gauge
              score={score}
              review
              style={{
                margin: 'auto',
                width: '100%',
                height: '300px',
              }}
              size={60}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" columnSpacing={mobileView.spacing}>
          <Grid item>
            <Link className="review-survey-button" to={`/take-survey/${survey.name}`}>
              <Button
                className={classes.button}
                variant="contained"
                justifyContent="center"
                alignItems="center"
              >
                Retake Survey
              </Button>
            </Link>
          </Grid>
        </Grid>
        <Box className={classes.divider2} style={{ marginBottom: '50px' }} />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={12} md={10} lg={8}>
            <AnswerList answers={surveyAnswers} />
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={1} justifyContent="center" alignItems="center" className="width-full">
        <Grid item xs={5} md={2}>
          <Link className="review-survey-button" to={`/take-survey/${survey.name}`}>
            <button type="button" className="take-survey">RETAKE SURVEY</button>
          </Link>
        </Grid>
        {loggedIn && (
          <Grid item xs={5} md={2}>
            <Link className="review-survey-button" to={`/take-survey/${survey.name}`} state={{ shouldUpdate: true }}>
              <button type="button" className="update-survey">UPDATE SURVEY</button>
            </Link>
          </Grid>
        )}
        <Grid item xs={10} md={3} lg={2}>
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle={`${name}-survey-results`}
            removeAfterPrint
            trigger={reactToPrintTrigger}
            pageStyle={getPageMargins}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent={mobileView.justifyContent} alignItems="center" className="width-full top-margin">
        <Grid item>
          <Link className={`review-survey-button ${mobileView.margin}`} to="/home">
            <Button className="button" variant="contained" color="primary">
              RETURN HOME
            </Button>
          </Link>
        </Grid>
        <Grid item>
          {loggedIn && (
            <Link className="review-survey-button" to={`/improvement-plan/${survey.name}`}>
              <button type="button" className="improvment-plan">
                VIEW IMPROVEMENT PLAN
              </button>
            </Link>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewSurveyPage;
