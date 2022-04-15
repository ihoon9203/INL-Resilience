import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Grid, TextField } from '@mui/material';

const PossibleAnswerInputWrapper = function PossibleAnswerInputWrapper({ index, taskValues, handleInputChange }) {
  const priorities = [{ priority: 'High' }, { priority: 'Medium' }, { priority: 'Low' }];
  const [isTaskRequired, setIsTaskRequired] = useState(false);
  const [isPriorityRequired, setIsPriorityRequired] = useState(false);

  useEffect(() => {
    if (taskValues.priority && taskValues.priority !== 'None') {
      setIsTaskRequired(true);
    } else {
      setIsTaskRequired(false);
    }
    if (taskValues.improvementPlanTask && taskValues.improvementPlanTask !== '') {
      setIsPriorityRequired(true);
    } else {
      setIsPriorityRequired(false);
    }
  }, [taskValues]);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-around"
      spacing={3}
    >
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box m={2}>
          <TextField
            id="possible-answer-input"
            name="possibleAnswer"
            label="Possible Answer"
            type="text"
            value={taskValues.possibleAnswer}
            variant="filled"
            onChange={(e) => handleInputChange(index, e)}
          />
        </Box>
        <Box m={2}>
          <TextField
            id="improvement-plan-input"
            required={isTaskRequired}
            name="improvementPlanTask"
            label="Improvement Plan Task"
            type="text"
            value={taskValues.improvementPlanTask || ''}
            variant="filled"
            onChange={(e) => handleInputChange(index, e)}
          />
        </Box>
        <Box m={1}>
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              required={isPriorityRequired}
              name="priority"
              value={taskValues.priority || ''}
              label="Priority"
              onChange={(e) => handleInputChange(index, e)}
            >
              <MenuItem value="None">None</MenuItem>
              {priorities.map((priority, idx) => <MenuItem key={idx} value={priority.priority}>{priority.priority}</MenuItem>)}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PossibleAnswerInputWrapper;
