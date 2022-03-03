import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Card, CardContent, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import '../styles/improvementPlan.css';

const Task = function TaskFunc({ task, priority }) {
  return (
    <>
      <CssBaseline />
      <Box>
        {task.priority === priority && (
          <Card
            classname="task-card"
            style={{
              marginLeft: '5%', marginRight: '5%', marginBottom: '1%', paddingLeft: '8px', paddingRight: '8px',
            }}
          >
            <CardContent className="task-card">
              <Grid container spacing={1} justify="left">
                <Grid item xs={0.5}>
                  <Typography variant="body">
                    {task.task}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </>
  );
};
Task.propTypes = {
  task: PropTypes.string.isRequired,
};

export default Task;
