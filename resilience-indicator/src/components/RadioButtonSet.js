import React, { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

class RadioButtonSet extends React.Component {
  
  render() {
    return (
      <div className="App">
        <FormControl component="fieldset">
          <RadioGroup row aria-label="question" name="row-radio-buttons-group" value={this.props.answerVal}
            onChange={this.props.myChangeHandler}>
            <FormControlLabel value="Yes" name="answer" control={<Radio size="small" />} label="Yes" />
            <FormControlLabel value="No" name="answer" control={<Radio size="small" />} label="No" />
            <FormControlLabel value="N/A" name="answer" control={<Radio size="small" />} label="N/A" />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

export default RadioButtonSet;