import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Button, Grid, Typography,
} from '@material-ui/core';
import { errorAlert, successAlert, warningAlert } from '../../../resources/swal-inl';

const RemoveQuestionContainer = function RemoveQuestionContainer({ survey }) {
  const [questions, setQuestions] = useState({});
  const [chosenQuestion, setChosenQuestion] = useState('');

  useEffect(() => {
    Axios
      .get(`/api/questions/${survey}`, { withCredentials: true })
      .then((res) => {
        setQuestions(res.data);
      });
  }, [survey]);

  const handleQuestionChange = (e) => {
    setChosenQuestion(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const questionId = questions[chosenQuestion];
    const data = { questionId };
    warningAlert("You won't be able to revert this!", 'Yes, delete!').then((result) => {
      if (result.isConfirmed) {
        Axios({
          method: 'POST',
          data,
          withCredentials: true,
          url: '/api/remove-question',
        })
          .then((res) => {
            if (res.status === 200) {
              successAlert('Question deleted.');
            } else {
              errorAlert('Something went wrong!');
            }
          })
          .catch((err) => {
            console.log(err);
            errorAlert('Unexpected error.');
          });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="space-around" spacing={3}>
        <Grid item xs={12}>
          <Typography color="primary" variant="h5" id="question-title">
            Remove a question
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={{ minWidth: 400 }}>
            <InputLabel id="question-select-label">Question</InputLabel>
            <Select
              autoWidth
              labelId="question-select-label"
              id="question-select"
              name="question"
              value={chosenQuestion}
              label="Question"
              onChange={handleQuestionChange}
            >
              {Object.keys(questions).map((question) => <MenuItem key={question} value={question}>{question}</MenuItem>)}
            </Select>
          </FormControl>
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

export default RemoveQuestionContainer;
