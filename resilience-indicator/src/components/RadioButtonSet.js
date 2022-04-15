import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const RadioButtonSet = function RadioButtonSetFunc({ answerBank, answerVal, myChangeHandler }) {
  return (
    <div className="App">
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="question"
          name="row-radio-buttons-group"
          value={answerVal}
          onChange={myChangeHandler}
        >
          {answerBank.map((answer, key) => (
            <FormControlLabel
              key={key}
              value={answer.possibleAnswer}
              name="answer"
              control={<Radio size="small" />}
              label={answer.possibleAnswer}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
RadioButtonSet.propTypes = {
  answerVal: PropTypes.string.isRequired,
  myChangeHandler: PropTypes.func.isRequired,
};

export default RadioButtonSet;
