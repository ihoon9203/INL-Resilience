import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Button, Grid, TextField, Typography,
} from '@mui/material';
import { errorAlert, successAlert } from '../../../resources/swal-inl';

const defaultValues = {
  subcategoryId: 0,
  question: '',
  weight: 0.0,
  information: '',
  survey: '',
  improvementPlanValues: [],
  possibleAnswers: [],
  correctAnswer: '',
};

const AddQuestionContainer = function AddQuestionContainer({ survey, handleUpdate }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [possibleAnswers, setPossibleAnswers] = useState('');
  const [improvementPlan, setImprovementPlan] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subcategories, setSubcategories] = useState({});
  const [chosenSubcategory, setChosenSubcategory] = useState('');

  function findPriority(abbr) {
    if (abbr === 'H') {
      return 'High';
    }
    if (abbr === 'M') {
      return 'Medium';
    }
    return 'Low';
  }

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
      survey,
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

  const handleImprovementPlanChange = (e) => {
    setImprovementPlan(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.score <= 0) {
      errorAlert('Please enter a score greater than 0.');
    } else {
      const improvementPlanValues = [];
      if (improvementPlan !== '') {
        try {
          const improvementList = improvementPlan.split(',');
          improvementList.forEach((item) => {
            const improveItem = item.split(':');
            const possibleAnswer = improveItem[0];
            // get the task without the priority
            const task = improveItem[1].slice(0, -4);
            // get the priority
            const priorityAbbr = improveItem[1].slice(-1);
            const priority = findPriority(priorityAbbr);
            const planItem = {
              task,
              possibleAnswer,
              priority,
            };
            improvementPlanValues.push(planItem);
          });
        } catch (err) {
          errorAlert('Please format the improvement task correctly.');
        }
      }

      formValues.improvementPlanValues = improvementPlanValues;

      // change string of possible answers to an array
      const possibleAnswersArray = possibleAnswers.split(',');
      formValues.possibleAnswers = possibleAnswersArray;

      formValues.correctAnswer = correctAnswer;

      Axios({
        method: 'POST',
        data: formValues,
        withCredentials: true,
        url: '/api/create-question',
      })
        .then((res) => {
          if (res.status === 200) {
            successAlert('Question added.');
            handleUpdate(true);
          } else {
            errorAlert('Something went wrong!');
          }
        })
        .catch((err) => {
          console.log(err);
          errorAlert('Unexpected error.');
        });
    }
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
            helperText="Please enter a comma-separated list of answers. (e.g., Yes,No,Not Applicable)"
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
          <TextField
            required
            id="improvement-plan-input"
            name="improvementPlan"
            label="Improvement Plan Task"
            helperText="Please enter one or more tasks associated with an answer and a priority of High (H), Medium (M), or Low (L). (e.g., Yes: Task 1 - H, No: Task 2 - M)"
            type="text"
            value={improvementPlan}
            multiline
            minRows={2}
            maxRows={3}
            variant="filled"
            onChange={handleImprovementPlanChange}
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
