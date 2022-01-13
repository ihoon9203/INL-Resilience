import React from 'react';
import PropTypes from 'prop-types';
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
QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default QuestionList;
