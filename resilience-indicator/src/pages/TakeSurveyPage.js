import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box, Button, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import Axios from 'axios';
import NotFoundPage from './NotFoundPage';
import QuestionList from '../components/QuestionList';
import surveyDescriptions from '../resources/survey-descriptions';
// eslint-disable-next-line import/no-unresolved
import useStyles from '../styles';

const TakeSurveyPage = function TakeSurveyPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);

  const [surveyQuestions, setSurveyQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/survey-questions/${name}`);
      const body = await result.json();

      /* eslint-disable no-param-reassign */
      setSurveyQuestions(() => {
        if (body.Questions) {
          body.Questions.map((parentQ) => {
            parentQ.answer = '';
            if (parentQ.Subquestions) {
              parentQ.Subquestions.map((subQ) => {
                subQ.answer = '';
                return null;
              });
            }

            return null;
          });
        }
        return body.Questions;
      });/* eslint-enable */
    };
    // eslint-disable-next-line no-console
    fetchData().catch((err) => console.log(err));
  }, [name]);

  if (!survey || surveyQuestions.length === 0) return <NotFoundPage />;

  const handleSubmit = (dataList) => {
    Axios({
      method: 'POST',
      data: dataList,
      withCredentials: true,
      url: '/api/saveAnswer',
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      // eslint-disable-next-line no-alert
      window.alert('There was an error trying to send a post request for the answers');
    });
  };

  const getAnswers = () => {
    const answerDbData = [];
    surveyQuestions.map((pQ) => {
      const pQData = {
        userId: 1,
        questionId: pQ.id,
        subquestionId: null,
        answer: pQ.answer,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      answerDbData.push(pQData);
      if (pQ.Subquestions) {
        pQ.Subquestions.map((sQ) => {
          const sQData = {
            userId: 1,
            questionId: null,
            subquestionId: sQ.id,
            answer: sQ.answer,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          answerDbData.push(sQData);
          return null;
        });
      }
      return null;
    });

    const answerCheckList = [];
    answerDbData.forEach((obj) => {
      answerCheckList.push(obj.answer);
    });

    if (answerCheckList.includes('')) console.log('All questions must be answered');

    // Call the request handler
    handleSubmit(answerDbData);
  };

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
        Survey
      </Typography>
      <Box className={classes.divider} />
      <container>
        <QuestionList questions={surveyQuestions} />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Link className="take-survey-button" to={`/review-survey/${survey.name}`}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => getAnswers()}
              >
                Submit Survey
              </Button>
            </Link>
          </Grid>
        </Grid>
      </container>
    </>
  );
};

export default TakeSurveyPage;
