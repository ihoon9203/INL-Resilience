/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Card, CardContent, Chip, Grid, Typography,
} from '@material-ui/core';
import useStyles from '../styles';
import AnswerList from './AnswerList';

const Answer = function AnswerFunc({ answer }) {
  return (
    <Card className={useStyles().card}>
      <CardContent>
        <Grid container spacing={1} justifyAlign="flex-start">
          <Grid item xs={10}>
            <Typography>{answer.Question.question}</Typography>
          </Grid>

          <Grid item xs={1}>
            <Chip
              label={answer.Question.weight}
              variant="outlined"
              color="error"
              size="small"
              style={{
                backgroundColor: `${answer.answer !== 'Yes' ? answer.answer === 'Not applicable' ? 'gray' : 'red' : 'white'}`,
              }}
            />
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
