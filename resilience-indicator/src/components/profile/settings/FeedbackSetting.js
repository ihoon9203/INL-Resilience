/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, TextField,
} from '@mui/material';
import Axios from 'axios';
import { escapeHtml } from '../../../resources/security';
import { errorAlert, successAlert } from '../../../resources/swal-inl';

const FeedbackSetting = function FeedbackSettingFunc(props) {
  const [values, setValues] = useState({
    feedback: '',
    id: '',
  });

  const [feedbackCategories, setFeedbackCategories] = useState([]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    // no empty feedback category
    if (values.id === '') {
      errorAlert('A feedback category must be selected');
      return;
    }

    // no empty feedback
    if (values.feedback === '') {
      errorAlert('Feedback must not be empty');
      return;
    }

    const body = {
      feedback: escapeHtml(values.feedback),
    };

    Axios({
      method: 'POST',
      data: body,
      withCredentials: true,
      url: `/api/feedback/${values.id}`,
    })
      .then((res) => {
        if (res.status === 201) {
          successAlert('Feedback submitted successfully!');
        } else {
          errorAlert('Unable to submit feedback');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error');
        console.log(err);
      });
  };

  useEffect(() => {
    Axios
      .get('/api/feedback-categories', { withCredentials: true })
      .then((res) => {
        const sortedResults = res.data.sort(
          (a, b) => ((a.feedbackCategoryValue > b.feedbackCategoryValue) ? 1 : -1),
        );
        setFeedbackCategories(sortedResults);
      });
  }, []);

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Submit feedback"
          title="Feedback"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Select Feedback Category"
            name="id"
            onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            value={values.id}
            variant="outlined"
          >
            <option
              disabled
              value=""
            />
            {feedbackCategories.map((option) => (
              <option
                key={option.feedbackCategoryValue}
                value={option.id}
              >
                {option.feedbackCategoryLabel}
              </option>
            ))}
          </TextField>
          <TextField
            multiline
            rows={2}
            fullWidth
            required
            label="Feedback"
            margin="normal"
            name="feedback"
            onChange={handleChange}
            value={values.feedback}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleFeedbackSubmit}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default FeedbackSetting;
