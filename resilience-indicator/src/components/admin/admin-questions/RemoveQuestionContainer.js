import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Button, Grid, Typography,
} from '@mui/material';
import { errorAlert, successAlert, warningAlert } from '../../../resources/swal-inl';

const RemoveQuestionContainer = function RemoveQuestionContainer({
  survey,
  handleUpdate,
  shouldUpdate,
  surveyChanged,
  handleSurveyChange,
}) {
  const [questions, setQuestions] = useState({});
  const [chosenQuestion, setChosenQuestion] = useState('');
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    if (shouldUpdate || surveyChanged) {
      Axios
        .get(`/api/questions/${survey}`, { withCredentials: true })
        .then((res) => {
          handleUpdate(false);
          handleSurveyChange(false);
          setQuestions(res.data);
        });
    }
  }, [survey, shouldUpdate, surveyChanged]);

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
          method: 'DELETE',
          data,
          withCredentials: true,
          url: '/api/delete-question',
        })
          .then((res) => {
            if (res.status === 200) {
              successAlert('Question deleted.');
            }
            handleUpdate(true);
          })
          .catch((err) => {
            console.log(err);
            errorAlert('Unexpected error.');
          });
      }
    });
  };
  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobileView(true);
    }
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="space-around" spacing={3}>
        <Grid item xs={12}>
          <Typography color="primary" variant="h5" id="question-title">
            Remove a question
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={mobileView ? { width: '90%' } : { width: 400 }}>
            <InputLabel id="question-select-label">Question</InputLabel>
            <Select
              labelId="question-select-label"
              id="question-select"
              name="question"
              value={chosenQuestion}
              label="Question"
              onChange={handleQuestionChange}
              style={mobileView ? { width: '90%' } : { minWidth: 400 }}
            >
              {Object.keys(questions).map((question) => (
                <MenuItem
                  key={question}
                  value={question}
                >
                  <Typography variant="inherit" noWrap>
                    {question}
                  </Typography>
                </MenuItem>
              ))}
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
