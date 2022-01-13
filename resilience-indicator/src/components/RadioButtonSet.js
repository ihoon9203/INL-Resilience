import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const RadioButtonSet = function RadioButtonSetFunc({ answerVal, myChangeHandler }) {
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
          <FormControlLabel
            value="Yes"
            name="answer"
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value="No"
            name="answer"
            control={<Radio size="small" />}
            label="No"
          />
          <FormControlLabel
            value="N/A"
            name="answer"
            control={<Radio size="small" />}
            label="N/A"
          />
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
