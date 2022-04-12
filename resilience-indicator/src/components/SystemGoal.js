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
// Snackbar
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { errorAlert } from '../resources/swal-inl';

const SystemGoal = function SystemGoalFunc(props) {
  const [goals, setGoals] = useState([]);
  const [date, setDate] = useState(null);
  const [newCat, setNewCat] = useState(props.category);
  const [addable, setAddable] = useState(false);
  const [newTitle, setNewTitle] = useState(null);
  const [newGoal, setNewGoal] = useState(props.task);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '700px',
    bgcolor: 'background.paper',
    border: '2px solid rgb(81, 99, 204)',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };
  // eslint-disable-next-line consistent-return
  const handlePost = () => {
    const newData = {
      goal: newGoal,
      title: newTitle,
      dueDate: date,
      survey: newCat,
      improvementPlan: null,
    };
    Axios.post('/api/create-goal', { newData })
      .then((res) => {
        if (res.status === 200) {
          // successSnack();
          props.handleClose();
          // setSnack(true);
        }
      })
      .catch((err) => {
        errorAlert('Something went wrong!');
        console.log(err);
      });
    window.location.reload(false);
  };
  // disable add button if date or title is left null
  useEffect(() => {
    if (!(date === null || newTitle === null)) {
      setAddable(true);
    } else {
      setAddable(false);
    }
  }, [date, newTitle]);
  useEffect(() => {
    Axios.get('/api/goal', { withCredentials: true })
      .then((res) => {
        setGoals(res.data);
      });
  }, []);

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
