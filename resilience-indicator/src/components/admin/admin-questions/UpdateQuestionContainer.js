import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Button, Grid, TextField, Typography,
} from '@material-ui/core';
import { errorAlert, successAlert } from '../../../resources/swal-inl';

const defaultValues = {
  subcategoryId: 0,
  newQuestion: '',
  currentQuestion: '',
  weight: 0.0,
  information: '',
};

const UpdateQuestionContainer = function UpdateQuestionContainer({ survey }) {
  const [questions, setQuestions] = useState({});
  const [formValues, setFormValues] = useState(defaultValues);
  const [possibleAnswers, setPossibleAnswers] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subcategories, setSubcategories] = useState({});
  const [chosenSubcategory, setChosenSubcategory] = useState('');

  useEffect(() => {
    Axios
      .get(`/api/subcategories/${survey}`, { withCredentials: true })
      .then((res) => {
        setSubcategories(res.data);
      });
    Axios
      .get(`/api/questions/${survey}`, { withCredentials: true })
      .then((res) => {
        setQuestions(res.data);
      });
  }, [survey]);

  const handleSubcategoryChange = (e) => {
    setChosenSubcategory(e.target.value);
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: subcategories[value],
    });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleNewQuestionChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: parseFloat(value),
    });
  };

  const handleInformationChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handlePossibleAnswerChange = (e) => {
    setPossibleAnswers(e.target.value);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // format possible answers and correct answers if not empty
    let possibleAnswersValues = {};
    if (possibleAnswers !== '') {
      const possibleAnswersArray = possibleAnswers.split(',');
      possibleAnswersValues = {
        question: formValues.currentQuestion,
        possibleAnswers: possibleAnswersArray,
      };
    }

    Axios({
      method: 'POST',
      data: formValues,
      withCredentials: true,
      url: '/api/update-question',
    })
      .then((res) => {
        const questionId = { questionId: res.data.id };
        if (res.status === 200 && possibleAnswers !== '') {
          Axios({
            method: 'POST',
            data: questionId,
            withCredentials: true,
            url: '/api/remove-possible-answer',
          })
          // eslint-disable-next-line no-shadow
            .then((res) => {
              if (res.status === 200) {
                Axios({
                  method: 'POST',
                  data: possibleAnswersValues,
                  withCredentials: true,
                  url: '/api/create-possible-answer',
                })
                // eslint-disable-next-line no-shadow
                  .catch((err) => {
                    console.log(err);
                    errorAlert('Unexpected error.');
                  });
              }
            });
        }
        if (res.status === 200 && correctAnswer !== '') {
          const correctAnswerValues = {
            questionId: res.data.id,
            correctAnswer,
          };
          Axios({
            method: 'POST',
            data: correctAnswerValues,
            withCredentials: true,
            url: '/api/update-correct-answer',
          })
          // eslint-disable-next-line no-shadow
            .catch((err) => {
              console.log(err);
              errorAlert('Unexpected error.');
            });
        }
      })
      .catch((err) => {
        console.log(err);
        errorAlert('Unexpected error.');
      });
    successAlert('Question updated.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="space-around" spacing={3}>
        <Grid item xs={12}>
          <Typography color="primary" variant="h5" id="question-title">
            Update a question
          </Typography>
          <Typography color="primary" variant="subtitle2" id="update-caption">
            Choose the subcategory and question. Enter in the values you want to change, and leave the rest blank.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ minWidth: 400 }}>
            <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
            <Select
              autoWidth
              required
              labelId="subcategory-select-label"
              id="subcategory-select"
              name="subcategoryId"
              value={chosenSubcategory}
              label="Subcategory"
              onChange={handleSubcategoryChange}
            >
              {Object.keys(subcategories).map((subcategory) => <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ minWidth: 400 }}>
            <InputLabel id="question-select-label">Question</InputLabel>
            <Select
              autoWidth
              labelId="question-select-label"
              id="question-select"
              name="currentQuestion"
              value={formValues.currentQuestion}
              label="Question"
              onChange={handleQuestionChange}
            >
              {Object.keys(questions).map((question) => <MenuItem key={question} value={question}>{question}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="new-question-input"
            aria-label="minimum height"
            name="newQuestion"
            label="Updated Question:"
            type="text"
            value={formValues.newQuestion}
            onChange={handleNewQuestionChange}
            multiline
            minRows={2}
            maxRows={4}
            variant="filled"
            style={{ width: 400 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="weight-input"
            name="weight"
            label="Updated Score"
            type="number"
            value={formValues.weight}
            variant="filled"
            onChange={handleWeightChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="information-input"
            aria-label="minimum height"
            name="information"
            label="Updated information"
            type="text"
            value={formValues.information}
            multiline
            minRows={2}
            maxRows={4}
            onChange={handleInformationChange}
            helperText="Write any extra information for a tooltip here."
            variant="filled"
            style={{ width: 400 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="possible-answers-input"
            name="possibleAnswers"
            label="Updated Answer Bank"
            helperText="Please enter a comma-separated list of answers."
            type="text"
            value={possibleAnswers}
            multiline
            minRows={2}
            maxRows={4}
            variant="filled"
            onChange={handlePossibleAnswerChange}
            style={{ width: 400 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="correct-answer-input"
            name="correctAnswers"
            label="Updated Correct Answer"
            helperText="Please enter the correct answer."
            type="text"
            value={correctAnswer}
            multiline
            minRows={2}
            maxRows={3}
            variant="filled"
            onChange={handleCorrectAnswerChange}
            style={{ width: 400 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateQuestionContainer;
