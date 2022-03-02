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
  question: '',
  weight: 0.0,
  information: '',
};

const AddQuestionContainer = function AddQuestionContainer({ survey }) {
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

    // change string of possible answers to an array
    const possibleAnswersArray = possibleAnswers.split(',');

    const possibleAnswerValues = {
      question: formValues.question,
      possibleAnswers: possibleAnswersArray,
    };

    const correctAnswerValues = {
      question: formValues.question,
      correctAnswer,
    };

    Axios({
      method: 'POST',
      data: formValues,
      withCredentials: true,
      url: '/api/create-question',
    })
      .then((res) => {
        if (res.status === 200) {
          Axios({
            method: 'POST',
            data: possibleAnswerValues,
            withCredentials: true,
            url: '/api/create-possible-answer',
          })
            // eslint-disable-next-line no-shadow
            .then((res) => {
              if (res.status === 200) {
                Axios({
                  method: 'POST',
                  data: correctAnswerValues,
                  withCredentials: true,
                  url: '/api/create-correct-answer',
                })
                // eslint-disable-next-line no-shadow
                  .then((res) => {
                    if (res.status === 200) {
                      successAlert('Question added.');
                    } else {
                      errorAlert('Something went wrong!');
                    }
                  })
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
        }
      })
      .catch((err) => {
        console.log(err);
        errorAlert('Unexpected error.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="space-around" spacing={3}>
        <Grid item xs={12}>
          <Typography color="primary" variant="h5" id="question-title">
            Add a question
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
          <TextField
            required
            id="question-input"
            aria-label="minimum height"
            name="question"
            label="Question:"
            type="text"
            value={formValues.question}
            onChange={handleQuestionChange}
            multiline
            minRows={2}
            maxRows={4}
            placeholder="Write question here."
            variant="filled"
            style={{ width: 400 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="weight-input"
            required
            name="weight"
            label="Question Score"
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
            label="Extra information"
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
            required
            id="possible-answers-input"
            name="possibleAnswers"
            label="Answer Bank"
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
            required
            id="correct-answer-input"
            name="correctAnswers"
            label="Correct Answer"
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

export default AddQuestionContainer;
