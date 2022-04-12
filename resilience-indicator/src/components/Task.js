import React, { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, CssBaseline, Grid, Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MUILinkify from 'material-ui-linkify';
import SystemGoal from './SystemGoal';
import '../styles/improvementPlan.css';

const Task = function TaskFunc({
  taskPriority, text, priority, completed, category,
}) {
  // Setup for System Goals
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobile(true);
    }
  }, []);
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
              <Grid container justifyalign="flex-start">
                {completed === 'true' && (
                  <Grid container direction="row" item xs={8} md={4}>
                    <Typography variant="h5"> Level Completed. </Typography>
                    <CheckCircleIcon fontSize="medium" color="success" />
                  </Grid>
                )}
                <Grid item xs={12} sm={6} md={7} lg={9}>
                  <MUILinkify>
                    <Typography variant="body2">
                      {text}
                    </Typography>
                  </MUILinkify>
                </Grid>
                <Grid container item xs={mobile ? 12 : 6} md={1} mt={1}>
                  <Grid
                    item
                    style={mobile ? {
                      width: '100%', marginTop: '10px', justifyContent: 'center',
                    } : { marginLeft: '90px' }}
                  >
                    {completed === 'false' && (
                      <Button
                        className="button"
                        variant="contained"
                        color="primary"
                        style={mobile ? { width: '100%' } : { width: '150px' }}
                        onClick={handleOpen}
                      >
                        Add Goal
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
            <SystemGoal task={text} category={category} open={open} setOpen={setOpen} handleClose={handleClose} />
          </Card>
        )}
      </Box>
    </>
  );
};

export default Task;
