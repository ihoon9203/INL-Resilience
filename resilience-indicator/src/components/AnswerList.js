import React from 'react';
import PropTypes from 'prop-types';
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
AnswerList.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnswerList;
