import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  Card, CardContent, Grid, Typography,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import RadioButtonSet from './RadioButtonSet';
import { errorAlert } from '../resources/swal-inl';

// Couldn't use the useStyles() method as before so I had to use this in file styling.
const cardStyle = {
  card: {
    margin: '30px 20px 20px 20px',
  },
};

const Question = function QuestionFunc({ question, answer }) {
  const [answerVal, setAnswerVal] = useState(answer);
  const [answerBank, setAnswerBank] = useState([]);

  useEffect(() => {
    setAnswerVal(answer);
    question.answer = answer; // eslint-disable-line no-param-reassign
  }, [answer]);

  useEffect(() => {
    Axios({
      method: 'POST',
      data: { questionId: question.id },
      withCredentials: true,
      url: '/api/possible-answers',
    })
      .then((res) => {
        setAnswerBank(res.data.possibleAnswers);
      })
      .catch((err) => {
        console.log(err);
        errorAlert('Unexpected error.');
      });
  }, [question]);

  const myChangeHandler = (event) => {
    setAnswerVal(event.target.value);
    question.answer = event.target.value; // eslint-disable-line no-param-reassign
  };

  return (
    <Card style={cardStyle.card}>
      <CardContent>
        <Grid container spacing={1} justifyContent="flex-start">
          <Grid item xs={10}>
            <Typography>{question.question}</Typography>
            <RadioButtonSet
              myChangeHandler={myChangeHandler}
              answerBank={answerBank}
              answerVal={answerVal}
            />
          </Grid>
          <Grid item>
            {question.information
            && (
              <Tooltip title={question.information}>
                <InfoIcon className="tool-tip-index" />
              </Tooltip>
            ) }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Question;
