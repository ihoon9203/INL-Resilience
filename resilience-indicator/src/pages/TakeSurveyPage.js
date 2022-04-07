import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import List from '@mui/material/List';
import {
  Box, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import {
  Dialog, DialogTitle, DialogActions, DialogContent, Button,
} from '@mui/material';
import Axios from 'axios';
import NotFoundPage from './NotFoundPage';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import SubcategoryLabel from '../components/SubcategoryLabel';
import { surveySubmitAlert, errorAlert } from '../resources/swal-inl';

const TakeSurveyPage = function TakeSurveyPageFunc() {
  const { state } = useLocation();
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);

  const navigate = useNavigate();

  const [showNotFound, setShowNotFound] = useState(false);
  const [subcategoryAnswers, setSubcategoryAnswers] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [naSubcategories, setNaSubcategories] = useState([]);
  const [consentOpen, setConsentOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Submit Survey');

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
        } else {
          setConsentOpen(true);
        }
      });
  }, [name]);

  useEffect(() => {
    // user is updating the survey
    if (state !== null && state.shouldUpdate) {
      setButtonText('Update Survey');
      Axios
        .get(`/api/survey-answers/${name}`)
        .then((res) => {
          if (res.data.length === 0) {
            setShowNotFound(true);
          }
          const subcategoryAnswer = [];
          subcategories.forEach((subcategoryItem) => {
            const answers = [];
            res.data.forEach((questionItem) => {
              if (questionItem.Question.Subcategory.subcategory === subcategoryItem.subcategory) {
                answers.push({ questionId: questionItem.Question.id, answer: questionItem.answer });
              }
            });
            subcategoryAnswer.push({ subcategory: subcategoryItem.subcategory, answers });
          });
          setSubcategoryAnswers(subcategoryAnswer);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [subcategories]);

  const handleConsentCloseAgree = () => {
    setConsentOpen(false);
  };

  const handleConsentCloseDisagree = () => {
    setConsentOpen(false);
    errorAlert('You must agree to the consent form to take a survey.')
      .then(() => {
        window.location = '/home';
      });
  };

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
      data: { userAnswers },
      withCredentials: true,
      url: `/api/submit-survey/${name}`,
    }).then((res) => {
      userScore = res.data.score;
    });

    surveySubmitAlert('Back to Home', 'View Results', userScore)
      .then((result) => {
        if (result.isConfirmed) {
          navigate(
            '/home',
          );
        } else if (!loggedIn) {
          navigate(
            `/review-survey/${name}`,
            { state: { userAnswers, userScore } },
          );
        } else {
          navigate(
            `/review-survey/${name}`,
          );
        }
      });
  };

  if (!survey || showNotFound) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Dialog
        open={consentOpen}
        onClose={handleConsentCloseDisagree}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle textAlign="center">
          Consent Form
        </DialogTitle>
        <DialogContent
          style={{
            height: '600px',
          }}
        >
          <embed
            src="../assets/consent-form.pdf"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConsentCloseDisagree} color="error">Disagree</Button>
          <Button onClick={handleConsentCloseAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <CssBaseline />
      <Typography
        variant="h4"
        align="center"
        color="primary"
        fontWeight="bolder"
        style={{ width: '100%', height: '90%' }}
      >
        {survey.title}
        {' '}
        Survey
      </Typography>
      <Box className={classes.divider2} />
      <List>
        {subcategories.map((subcatObj, key) => {
          let surveyAnswers;
          if (subcategoryAnswers.length > 0) {
            /* eslint-disable no-restricted-syntax */
            for (const item of subcategoryAnswers) {
              console.log(item);
              if (item.subcategory === subcatObj.subcategory) {
                surveyAnswers = item.answers;
                break;
              }
            }
          }
          return <SubcategoryLabel key={key} subcatObj={subcatObj} handleNaSubcategoryChange={handleNaSubcategoryChange} surveyAnswers={surveyAnswers} />;
        })}
      </List>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TakeSurveyPage;
