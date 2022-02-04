import React, { useState } from 'react';
import {
  Button, Grid, TextField, Typography,
} from '@material-ui/core';

const defaultValues = {
  surveyId: 0,
  question: '',
  weight: 0,
  information: '',
};

const AddQuestionContainer = function AddQuestionContainer({ survey }) {
  const [formValues, setFormValues] = useState(defaultValues);

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
      [name]: value,
    });
  };

  const handleInformationChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (survey === 'Financial') {
      setFormValues({
        ...formValues,
        surveyId: 1,
      });
    }
    if (survey === 'Emergency') {
      setFormValues({
        ...formValues,
        surveyId: 2,
      });
    }
    if (survey === 'Public Health') {
      setFormValues({
        ...formValues,
        surveyId: 3,
      });
    }
    if (survey === 'Cyber Security') {
      setFormValues({
        ...formValues,
        surveyId: 4,
      });
    }
    // eslint-disable-next-line
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" justifyContent="space-around" spacing={3}>
        <Grid item xs={12}>
          <Typography color="primary" variant="h5" id="question-title">
            { `${survey}: Add a question` }
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="question-input"
            aria-label="minimum height"
            name="question"
            label="Question:"
            type="text"
            value={formValues.question}
            onChange={handleQuestionChange}
            multiline
            rows={2}
            maxRows={4}
            placeholder="Write question here."
            variant="filled"
            style={{ width: 300 }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="weight-input"
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
            rows={2}
            maxRows={4}
            onChange={handleInformationChange}
            placeholder="Write extra information here."
            variant="filled"
            style={{ width: 300 }}
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
