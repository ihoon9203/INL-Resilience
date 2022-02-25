/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, TextField, Snackbar, Alert,
} from '@mui/material';
import Axios from 'axios';

const FeedbackSetting = function FeedbackSettingFunc(props) {
  const [values, setValues] = useState({
    feedback: '',
    id: '',
  });

  const [feedbackCategories, setFeedbackCategories] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [alert, setAlert] = useState({
    message: '',
    severity: 'success',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const showToast = (message, severity) => {
    setAlert({ message, severity });
    setSnackbarOpen(true);
  };

  // prevent XSS
  const escapeHtml = (unsafe) => unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();

    // no empty feedback category
    if (values.id === '') {
      showToast('A feedback category must be selected', 'error');
      return;
    }

    // no empty feedback
    if (values.feedback === '') {
      showToast('Feedback must not be empty', 'error');
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
          showToast('Feedback submitted successfully!', 'success');
        } else {
          showToast('Unable to submit feedback', 'error');
        }
      })
      .catch((err) => {
        showToast('Unexpected error', 'error');
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
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert variant="filled" elevation={6} onClose={handleSnackbarClose} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </Box>
      </Card>
    </form>
  );
};

export default FeedbackSetting;
