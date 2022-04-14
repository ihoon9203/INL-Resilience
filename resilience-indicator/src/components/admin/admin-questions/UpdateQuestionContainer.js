import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import PossibleAnswerInputWrapper from './PossibleAnswerInputWrapper';
import { errorAlert, successAlert } from '../../../resources/swal-inl';

const defaultValues = {
  newQuestion: '',
  currentQuestion: '',
  weight: 0.0,
  information: '',
};

const UpdateQuestionContainer = function UpdateQuestionContainer({
  survey,
  handleUpdate,
  shouldUpdate,
  surveyChanged,
  handleSurveyChange,
}) {
  const [questions, setQuestions] = useState({});
  const [chosenQuestion, setChosenQuestion] = useState('');
  const [formValues, setFormValues] = useState(defaultValues);
  const [shouldUpdateAnswers, setShouldUpdateAnswers] = useState(false);
  const [taskValues, setTaskValues] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
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

  useEffect(() => {
    if (chosenQuestion !== '') {
      const id = questions[chosenQuestion];
      Axios
        .get(`/api/answers-and-tasks/${id}`, { withCredentials: true })
        .then((res) => {
          setTaskValues(res.data);
        });
    }
  }, [chosenQuestion]);

  const handleInputChange = (index, e) => {
    setShouldUpdateAnswers(true);
    const { name, value } = e.target;
    const taskValuesCopy = [...taskValues];
    const tempTaskValue = {
      ...taskValuesCopy[index],
      [name]: value,
    };
    taskValuesCopy[index] = tempTaskValue;
    setTaskValues(taskValuesCopy);
  };

  const handleQuestionChange = (e) => {
    setChosenQuestion(e.target.value);
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

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const answersData = { taskValues, survey };
    Axios({
      method: 'POST',
      data: formValues,
      withCredentials: true,
      url: '/api/update-question',
    })
      .then((res) => {
        handleUpdate(true);
        // update correct answer if user specified
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

    if (shouldUpdateAnswers) {
      Axios({
        method: 'POST',
        data: answersData,
        withCredentials: true,
        url: '/api/update-answer',
      })
        .catch((err) => {
          console.log(err);
          errorAlert('Unexpected error.');
        });
    }
    successAlert('Question updated.');
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
            Update a question
          </Typography>
          <Typography color="primary" variant="subtitle2" id="update-caption">
            Choose the question you want to update. Enter in the values you want to change, and leave the rest blank.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl style={mobileView ? { width: '90%' } : { minWidth: 400 }}>
            <InputLabel id="question-select-label">Question</InputLabel>
            <Select
              autoWidth
              labelId="question-select-label"
              id="question-select"
              name="currentQuestion"
              value={formValues.currentQuestion}
              label="Question"
              onChange={handleQuestionChange}
              style={mobileView ? { width: '90%' } : { minWidth: 400 }}
            >
              {Object.keys(questions).map((question, index) => (
                <MenuItem key={index} value={question}>
                  <Typography variant="inherit" noWrap>
                    {question}
                  </Typography>
                </MenuItem>
              ))}
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
            style={mobileView ? { width: '90%' } : { minWidth: 400 }}
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
            style={mobileView ? { width: '50%' } : {}}
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
            style={mobileView ? { width: '90%' } : { minWidth: 400 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography color="primary" variant="subtitle2">
            Here you can update the answers and their improvement plan tasks, as well as the priority of those tasks.
          </Typography>
          {taskValues.map((value, index) => (
            <PossibleAnswerInputWrapper
              index={index}
              taskValues={value}
              handleInputChange={handleInputChange}
            />
          ))}
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
            style={mobileView ? { width: '90%' } : { minWidth: 400 }}
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
