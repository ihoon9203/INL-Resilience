/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
// Modal
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// Date Picker
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';
// Input & Select
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
// Snackbar
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import '../styles/goals.css';
import AchievementCard from '../components/AchievementCard';

const GoalsPage = function AchievementsPageFunc() {
  const [snack, setSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('Adding goal failed');
  const [snackColor, setSnackColor] = useState('danger');
  const [goals, setGoals] = useState([]);
  const [date, setDate] = useState(null);
  const [newCat, setNewCat] = useState(null);
  const [addable, setAddable] = useState(false);
  const [newTitle, setNewTitle] = useState(null);
  const [newGoal, setNewGoal] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDate(null);
    setNewCat(null);
    setNewTitle(null);
    setOpen(false);
    setNewGoal(null);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid rgb(81, 99, 204)',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  };
  const successSnack = () => {
    setSnackColor('success');
    setSnackMessage('Successfully added new goal');
  };
  const handleSnackClose = () => {
    setSnack(false);
  };
  const action = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color={snackColor}
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );
  // eslint-disable-next-line consistent-return
  const handlePost = () => {
    const newData = {
      goal: newGoal,
      title: newTitle,
      dueDate: date,
      survey: newCat,
      improvementPlan: null,
    };
    console.log(newData);
    Axios.post('/api/create-goal', { newData })
      .then((res) => {
        if (res.status === 200) {
          successSnack();
          handleClose();
          setSnack(true);
        }
        console.log(res.status);
      });
    window.location.reload(false);
  };
  // disable add button if at least one component of form is unfilled
  useEffect(() => {
    if (!(date === null || newCat === null || newTitle === null || newGoal === null)) {
      setAddable(true);
    } else {
      setAddable(false);
    }
  }, [date, newCat, newTitle]);
  useEffect(() => {
    Axios.get('/api/goal', { withCredentials: true })
      .then((res) => {
        setGoals(res.data);
      });
  }, []);
  const getGoalCards = goals.map((goal) => <AchievementCard goal={goal} modify />);
  return (
    <div>
      <Container>
        <Row>
          <div className="achievements-title">GOALS</div>
        </Row>
        <Row className="center-container mb-2">
          <Col xs={2}>
            <div className="newgoal-button"><Button variant="outlined" size="small" onClick={handleOpen}>+ New Goals</Button></div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="goals-list">
              {getGoalCards}
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="no-animation">
            <Typography id="transition-modal-title" variant="h5" component="h2" gutterBottom>
              Set a New Goal
            </Typography>
            <Typography id="transition-modal-title" variant="h6" component="h2" mt={2}>
              Title:
            </Typography>
            <TextField
              id="outlined-basic"
              label="Title of Goal"
              variant="outlined"
              onChange={(newValue) => {
                setNewTitle(newValue.target.value);
              }}
            />
            <Typography id="transition-modal-title" variant="h6" component="h2" mt={2}>
              Goal Description:
            </Typography>
            <TextField
              id="outlined-basic"
              label="Goal Description"
              variant="outlined"
              onChange={(newValue) => {
                setNewGoal(newValue.target.value);
              }}
            />
            <Typography id="transition-modal-title" variant="h6" component="h2" mt={2}>
              Due Date:
            </Typography>
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
            <Typography id="transition-modal-title" variant="h6" component="h2" mt={2}>
              Category:
            </Typography>
            <Box sx={{ maxWidth: 240 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={newCat}
                  label="Category"
                  onChange={(newValue) => {
                    setNewCat(newValue.target.value);
                  }}
                >
                  <MenuItem value="health">Health</MenuItem>
                  <MenuItem value="finance">Finance</MenuItem>
                  <MenuItem value="emergency">Emergency</MenuItem>
                  <MenuItem value="cyber">Cyber Security</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mt={2}>
              <Row>
                <Col className="center-container"><Button id="post-button" disabled={!addable} variant="contained" onClick={handlePost}>Add</Button></Col>
                <Col className="center-container"><Button variant="outlined" onClick={handleClose}>Cancel</Button></Col>
              </Row>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default GoalsPage;
