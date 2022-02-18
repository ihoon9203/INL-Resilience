import { useState } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, Divider, TextField,
} from '@mui/material';

// TODO: handle feedback submission

const feedbackCategory = [
  {
    value: 'survey-question-suggestion',
    label: 'Survey Question Suggestion',
  },
  {
    value: 'ui-suggestion',
    label: 'User Interface Suggestion',
  },
  {
    value: 'bug',
    label: 'Report A Bug',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const FeedbackSetting = function FeedbackSettingFunc(props) {
  const [values, setValues] = useState({
    feedback: '',
    category: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

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
            name="category"
            onChange={handleChange}
            required
            select
            SelectProps={{ native: true }}
            value={values.category}
            variant="outlined"
          >
            {feedbackCategory.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </TextField>
          <TextField
            multiline
            rows={2}
            fullWidth
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
          >
            Submit
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default FeedbackSetting;
