import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box, Button, Card, CssBaseline, Grid, Typography,
} from '@mui/material';
import ReactToPrint from 'react-to-print';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import TaskList from '../components/TaskList';
import '../styles/improvementPlan.css';

const ImprovementPlan = function ImprovementPlaFunc() {
  const componentRef = React.useRef(null);
  const classes = useStyles();
  const { name } = useParams();
  const survey = surveyDescriptions.find((s) => s.name === name);
  const getPageMargins = () => '@media print { body { -webkit-print-color-adjust: exact; } @page { size: Legal; margin: 0mm !important }}';

  const [surveyTasks, setSurveyTasks] = useState([]);

  const [showGoalButton, setShowGoalButton] = useState(false);
  const [goalButtonText, setGoalButtonText] = useState('CREATE TASK GOALS');
  const showGoals = () => {
    setShowGoalButton(!showGoalButton);

    if (showGoalButton) {
      setGoalButtonText('CREATE TASK GOALS');
    } else {
      setGoalButtonText('EXIT GOALS VIEW');
    }
  };

  const reactToPrintTrigger = React.useCallback(() => (
    <Button className="button" variant="contained" color="primary">DOWNLOAD PLAN</Button>
  ), []);

  const reactToPrintContent = React.useCallback(() => componentRef.current, [componentRef.current]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/improvement-plan-tasks/${name}`);
      const body = await result.json();
      setSurveyTasks(body);
    };
    fetchData().catch((err) => console.log(err));
  }, [name]);

  return (
    <>
      <CssBaseline />
      <div ref={componentRef}>
        <Typography
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
        <Box style={{ paddingLeft: '10%', paddingRight: '10%', paddingTop: '80px' }}>
          <Grid
            containerdirection="column"
            alignitem="center"
          >
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button className="button" variant="contained" color="primary" onClick={() => showGoals()}>
                  {goalButtonText}
                </Button>
              </Grid>
            </Grid>
            <Card className="priority-card" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
              <Typography
                className="priority"
                style={{
                  color: 'red', padding: '24px', fontSize: '24px', fontWeight: 'bolder', fontFamily: 'Jost',
                }}
              >
                HIGH PRIORITY
              </Typography>
              <TaskList tasks={surveyTasks} priority="High" category={name} enableGoal={showGoalButton} />
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
              <TaskList tasks={surveyTasks} priority="Medium" category={name} enableGoal={showGoalButton} />
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
              <TaskList tasks={surveyTasks} priority="Low" category={name} enableGoal={showGoalButton} />
            </Card>
          </Grid>
        </Box>
      </div>
      <Box style={{ paddingLeft: '10%', paddingRight: '10%', paddingBottom: '20px' }}>
        <Grid container spacing={2} style={{ marginTop: '64px', alignitems: 'right' }}>
          <Grid item>
            <Link className="review-survey-button" to="/home">
              <Button className="button" variant="contained" color="primary">
                Return Home
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <ReactToPrint
              content={reactToPrintContent}
              documentTitle={`${name}-improvement-plan`}
              removeAfterPrint
              trigger={reactToPrintTrigger}
              pageStyle={getPageMargins}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ImprovementPlan;
