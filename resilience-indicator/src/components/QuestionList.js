import React from 'react';
import List from '@mui/material/List';
import Question from './Question';

const QuestionList = function QuestionListFunc({ questions, answers }) {
  if (answers) {
    return (
      <List>
        {questions.map((question, key) => {
          let userAnswer;
          /* eslint-disable no-restricted-syntax */
          for (const ans of answers) {
            if (ans.questionId === question.id) {
              userAnswer = ans.answer;
              break;
            }
          }
          return <Question key={key} question={question} answer={userAnswer} />;
        })}
      </List>
    );
  }

  return (
    <List>
      {questions.map((question, key) => (
        <Question key={key} question={question} answer="" />
      ))}
    </List>
  );
};

export default QuestionList;
