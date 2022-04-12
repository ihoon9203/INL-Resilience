/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Box, Grid,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import '../styles/systemGoals.css';
// Modal
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// Date Picker
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';
// Alerts
import { successTimerAlert, errorAlert } from '../resources/swal-inl';

const SystemGoal = function SystemGoalFunc(props) {
  const { task } = props;
  const { category } = props;
  const [date, setDate] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const [addable, setAddable] = useState(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '700px',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };

  const handlePost = () => {
    const newData = {
      goal: task,
      title: newTitle,
      dueDate: date,
      survey: category,
      improvementPlan: null,
    };
    Axios.post('/api/create-goal', { newData })
      .then((res) => {
        if (res.status === 200) {
          successTimerAlert('Your task goal was created successfully! Go to Acheivements to view and manage your new goal.');
          props.handleClose();
        } else {
          errorAlert('Unable to create task goal. Please try again.');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error!');
        console.log(err);
      });
  };
  // disable 'create goal' button if date or title is left null
  useEffect(() => {
    if (!(date === null || newTitle === null)) {
      setAddable(true);
    } else {
      setAddable(false);
    }
  }, [date, newTitle]);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box sx={style} className="no-animation">
          <Grid container justifyContent="center">
            <p className="header" mt={2}>
              SET TASK GOAL
            </p>
            <Tooltip
              title="Please enter a Title and a Due Date for this Task Goal and click the Create Goal button
              to finalize the goal. You can view and manage the goal in the Acheivements page"
            >
              <InfoIcon className="tool-tip-index" />
            </Tooltip>
          </Grid>
          <Grid container style={{ marginTop: '20px' }}>
            <p className="subheader" mt={2}>
              Title:
            </p>
            <TextField
              id="outlined-basic"
              label="Title of Goal"
              variant="outlined"
              onChange={(newValue) => {
                setNewTitle(newValue.target.value);
              }}
            />
          </Grid>
          <Grid container style={{ marginBottom: '20px' }}>
            <p className="subheader" mt={2}>
              Description:
            </p>
            <TextField
              disabled
              multiline
              id="outlined-disabled"
              label="Task from Improvement Plan"
              variant="outlined"
              defaultValue={props.task}
              sx={{ width: '80ch' }}
            />
          </Grid>
          <Grid container style={{ marginBottom: '40px' }}>
            <p className="subheader" mt={2}>
              Due Date:
            </p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="mm/dd/yyyy"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={3}>
              <button type="button" className="improvment-plan" disabled={!addable} onClick={handlePost}>CREATE GOAL</button>
            </Grid>
            <Grid item>
              <button type="button" className="download-survey" onClick={props.handleClose}>CANCEL</button>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SystemGoal;
