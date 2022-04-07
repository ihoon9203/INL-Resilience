import React from 'react';
import {
  Box, Card, CardContent, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/improvementPlan.css';

const Task = function TaskFunc({
  taskPriority, text, priority, completed,
}) {
  return (
    <>
      <CssBaseline />
      <Box>
        {taskPriority === priority && (
          <Card
            className="task-card"
            style={{
              marginLeft: '5%', marginRight: '5%', marginBottom: '1%', paddingLeft: '8px', paddingRight: '8px',
            }}
          >
            <CardContent className="task-card">
              <Grid container direction="row" justifyalign="flex-start">
                {completed === 'true' && (
                  <Grid container direction="row" item xs={8} md={4}>
                    <Typography variant="h5"> Level Completed. </Typography>
                    <CheckCircleIcon fontSize="medium" color="success" />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Typography variant="body2">
                    {text}
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

export default Task;
