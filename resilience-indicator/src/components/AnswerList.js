import React from 'react';
import { List } from '@material-ui/core';
import Answer from './Answer';

const AnswerList = function AnswerListFunc({ answers }) {
  return (
    <List>
      {answers.map((answer, key) => (
        <Answer key={key} answer={answer} />
      ))}
    </List>
  );
};

export default AnswerList;
