import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import {
  Box, Button, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import Axios from 'axios';
import NotFoundPage from './NotFoundPage';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import SubcategoryLabel from '../components/SubcategoryLabel';
import { surveySubmitAlert, errorAlert } from '../resources/swal-inl';

const TakeSurveyPage = function TakeSurveyPageFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);

  const [subcategories, setSubcategories] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [naSubcategories, setNaSubcategories] = useState([]);

  useEffect(() => {
    Axios
      .get(`/api/survey-questions/${name}`)
      .then((res) => {
        setSubcategories(res.data.Subcategories);
      });
    Axios
      .get('/api/logged_in', { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setLoggedIn(res.data.loggedIn);
        }
      });
  }, [name]);

  const handleNaSubcategoryChange = async (subCat, add) => {
    if (add) {
      naSubcategories.push(subCat);
      setNaSubcategories(naSubcategories);
    } else {
      const newList = naSubcategories.filter((s) => s.id !== subCat.id);
      setNaSubcategories(newList);
    }
  };

  const handleSubmit = async () => {
    // Gather answers
    const userAnswers = [];
    subcategories.forEach((s) => {
      const found = naSubcategories.find((n) => n.id === s.id);
      if (found) {
        s.Questions.forEach((q) => {
          userAnswers.push({
            questionId: q.id,
            answer: 'Not applicable',
          });
        });
      } else {
        s.Questions.forEach((q) => {
          userAnswers.push({
            questionId: q.id,
            answer: q.answer,
          });
        });
      }
    });

    console.log(userAnswers);

    // Validate all questions are answered
    let questionNotAnswered = false;
    userAnswers.forEach((obj) => {
      if (!obj.answer) {
        questionNotAnswered = true;
      }
    });
    if (questionNotAnswered) {
      errorAlert('All applicable questions must be answered');
      return;
    }

    // Submit survey
    let userScore;
    await Axios({
      method: 'POST',
      data: { userAnswers, naSubcategories },
      withCredentials: true,
      url: `/api/submit-survey/${name}`,
    }).then((res) => {
      userScore = res.data.score;
    });

    // TODO: remove me
    console.log(userScore);

    if (!loggedIn) {
      // guest user
      surveySubmitAlert('Back to Home', 'Download Results')
        .then((result) => {
          if (result.isConfirmed) {
            window.location = '../home';
          } else {
            // TODO: download survey results
            console.log('Download Results');
          }
        });
    } else {
      // logged in user
      surveySubmitAlert('Back to Survey', 'View Results')
        .then((result) => {
          if (result.isConfirmed) {
            console.log('Back to Survey');
          // window.location = `../description/${name}`;
          } else {
            console.log('View Results');
          // window.location = `../review-survey/${name}`;
          }
        });
    }
  };

  if (!survey) return <NotFoundPage />;

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
      <List>
        {subcategories.map((subcatObj, key) => (
          <SubcategoryLabel key={key} subcatObj={subcatObj} handleNaSubcategoryChange={handleNaSubcategoryChange} />
        ))}
      </List>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit Survey
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TakeSurveyPage;
