/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Card, CardContent, Grid, Typography,
} from '@material-ui/core';
import useStyles from '../styles';
import AnswerList from './AnswerList';

const Answer = function AnswerFunc({ answer }) {
  return (
    <Card className={useStyles().card}>
      <CardContent style={{
        backgroundColor: `${answer.answer !== 'Yes' ? answer.answer === 'Not applicable' ? 'rgb(132, 132, 132, 0.26)' : 'rgb(247, 68, 68, 0.30)' : 'white'}`,
      }}
      >
        <Grid container spacing={1} justifyAlign="flex-start">
          <Grid item xs={10}>
            <Typography>{answer.Question.question}</Typography>
          </Grid>
        </Grid>
        <li>
          <Typography className={useStyles().answer}>{answer.answer}</Typography>
          {answer.sub_answers && <AnswerList answers={answer.sub_answers} />}
        </li>
      </CardContent>
    </Card>
  );
};

export default Answer;
