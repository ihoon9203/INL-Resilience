import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SurveyList = function SurveyListFunc({ surveys }) {
  return (
    <>
      {surveys.map((survey, key) => (
        <Link className="survey-list-item" key={key} to={`/survey/${survey.name}`}>
          <h3>{survey.title}</h3>
          <p>
            {survey.description[0].substring(0, 120)}
            ...
          </p>
        </Link>
      ))}
    </>
  );
};
SurveyList.propTypes = {
  surveys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SurveyList;
