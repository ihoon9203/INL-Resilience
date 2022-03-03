import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box, Button, Card, CssBaseline, Grid, Typography,
} from '@material-ui/core';
import NotFoundPage from './NotFoundPage';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import TaskList from '../components/TaskList';
import '../styles/improvementPlan.css';

const ImprovementPlan = function ImprovementPlaFunc() {
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);

  const [surveyTasks, setSurveyTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/improvement-plan-tasks/${name}`);
      const body = await result.json();
      setSurveyTasks(body);
      console.log(body);
    };
    fetchData().catch((err) => console.log(err));
  }, [name]);
  if (!survey || surveyTasks.length === 0) return <NotFoundPage />;

  return (
    <>
      <CssBaseline />
      <Typography
        className="title"
        variant="h3"
        align="center"
        color="primary"
        fontWeight="bolder"
        style={{
          width: '100%', height: '90%', paddingTop: '16px',
        }}
      >
        {survey.title}
        {' '}
        Improvement Plan
      </Typography>
      <Box className={classes.divider2} />
      <Box style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <Grid
          containerdirection="column"
          justifyContent="space-evenly"
          alignItem="center"
        >
          <Card className="priority-card" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
            <Typography
              className="priority"
              style={{
                color: 'red', padding: '24px', fontSize: '24px', fontWeight: 'bolder', fontFamily: 'Jost',
              }}
            >
              HIGH PRIORITY
            </Typography>
            <TaskList tasks={surveyTasks} priority="High" />
          </Card>

          <Card className="priority-card" style={{ backgroundColor: 'rgba(255, 150, 0, 0.1)' }}>
            <Typography
              className="priority"
              style={{
                color: 'orange', padding: '24px', fontSize: '24px', fontWeight: 'bolder', fontFamily: 'Jost',
              }}
            >
              MEDIUM PRIORITY
            </Typography>
            <TaskList tasks={surveyTasks} priority="Medium" />
          </Card>

          <Card className="priority-card" style={{ backgroundColor: 'rgba(0, 0, 255, 0.1)' }}>
            <Typography
              className="priority"
              style={{
                color: 'blue', padding: '24px', fontSize: '24px', fontWeight: 'bolder', fontFamily: 'Jost',
              }}
            >
              LOW PRIORITY
            </Typography>
            <TaskList tasks={surveyTasks} priority="Low" />
          </Card>
          <Grid style={{ marginTop: '64px', alignItems: 'right' }}>
            <Link className="review-survey-button" to="/home">
              <Button className="button" variant="contained" color="primary">
                Return Home
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ImprovementPlan;
