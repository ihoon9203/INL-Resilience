import React from "react";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { purple } from "@mui/material/colors";


const RadioButtonSet = () => (

  <div className="App">
    <FormControl component="fieldset">
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
        <FormControlLabel value="yes" control={<Radio size="small"  />} label="Yes" />
        <FormControlLabel value="no" control={<Radio size="small"  />} label="No" />
        <FormControlLabel value="n/a" control={<Radio size="small"  />} label="N/A" />
      </RadioGroup>
    </FormControl>
  </div>


);

export default RadioButtonSet;