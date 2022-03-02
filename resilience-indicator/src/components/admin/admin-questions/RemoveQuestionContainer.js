import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Button, Grid, Typography,
} from '@material-ui/core';

const defaultValues = {
  subcategoryId: 0,
  question: '',
  weight: 0.0,
  information: '',
};

const RemoveQuestionContainer = function RemoveQuestionContainer({ survey }) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [subcategories, setSubcategories] = useState({});
  const [chosenSubcategory, setChosenSubcategory] = useState('');
  //   const [questions, setQuestions] = useState({});
  //   const [chosenQuestion, setChosenQuestion] = useState('');

  useEffect(() => {
    Axios
      .get(`/api/subcategories/${survey}`, { withCredentials: true })
      .then((res) => {
        setSubcategories(res.data);
      });
  }, [survey]);

  useEffect(() => {
    Axios
      // eslint-disable-next-line prefer-template
      .get('/api/questions/' + encodeURIComponent(chosenSubcategory), { withCredentials: true })
      .then(() => {
      // eslint-disable-next-line
      // console.log(res);
      // setQuestions(res.data);
      });
  }, [chosenSubcategory]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    // console.log(formValues);

    // Axios({
    //   method: 'POST',
    //   data: formValues,
    //   withCredentials: true,
    //   url: '/api/create-question',
    // })
    //   .then((res) => {
    //     console.log(res.status);
    //     if (res.status === 200) {
    //       // eslint-disable-next-line no-alert
    //       window.alert('Successfully added question!');
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
            <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
            <Select
              autoWidth
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
              name="question"
              value="test"
              label="Question"
              onChange={handleQuestionChange}
            >
              {Object.keys(subcategories).map((subcategory) => <MenuItem key={subcategory} value={subcategory}>{subcategory}</MenuItem>)}
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
