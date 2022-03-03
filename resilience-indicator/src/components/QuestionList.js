import React from 'react';
import List from '@mui/material/List';
import Question from './Question';

const QuestionList = function QuestionListFunc({ questions }) {
  return (
    <List>
      {questions.map((question, key) => (
        <Question key={key} question={question} />
      ))}
    </List>
  );
};

export default QuestionList;
