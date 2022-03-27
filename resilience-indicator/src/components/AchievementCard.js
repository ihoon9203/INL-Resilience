/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios';
import '../styles/goals.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Container } from 'react-bootstrap';
import { errorAlert } from '../resources/swal-inl';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
const AchievementCard = function AchievementCardFunc(props) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [goalID, setGoalID] = useState(null);
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState(null);
  const [img, setImg] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [modify, setModify] = useState(false);
  const [cp, setCP] = useState(false);
  // update
  const [newGoal, setNewGoal] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newCat, setNewCat] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [updateDate, setUpdateDate] = useState('');
  const [createDate, setCreateDate] = useState('');
  const parseDateReadable = (date) => {
    const dates = date.split('T');
    return dates[0];
  };
  useEffect(() => {
    if (props.goal !== undefined) {
      setUpdateDate(parseDateReadable(props.goal.updatedAt));
      setCreateDate(parseDateReadable(props.goal.createdAt));
      setGoal(props.goal.goal);
      setImg(props.goal.surveyId);
      setDueDate(props.goal.dueDate);
      setCompleted(props.goal.completed);
      setTitle(props.goal.title);
      setGoalID(props.goal.id);
      // update initialize
      setNewGoal(props.goal.goal);
      setNewDate(props.goal.dueDate);
      setNewTitle(props.goal.title);
      const cat = props.goal.surveyId;
      switch (cat) {
      case 1:
        setImg('./assets/finance_badge.png');
        setNewCat('Finance');
        setCategory('Finance');
        break;
      case 2:
        setImg('./assets/emergency_badge.png');
        setCategory('Emergency');
        setNewCat('Emergency');
        break;
      case 3:
        setImg('./assets/health_badge.png');
        setCategory('Health');
        setNewCat('Health');
        break;
      case 4:
        setImg('./assets/cyber_badge.png');
        setCategory('Cyber Security');
        setNewCat('Cyber');
        break;
      default:
        setImg('./assets/nocat_badge.png');
        setCategory('N/A');
        break;
      }
    }
    if (props.modify) {
      setModify(true);
    }
    if (props.cp) {
      setCP(true);
    }
  }, [props]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateOpen = () => {
    setUpdateOpen(true);
  };
  const handleUpdateClose = () => {
    setUpdateOpen(false);
  };
  const handleDelete = () => {
    Axios.post('/api/remove-goal', { goalID });
    handleClose();
    window.location.reload(false);
  };
  const toggleUpdate = () => {
    handleClose();
    handleUpdateOpen();
  };
  const toggleComplete = () => {
    Axios.post('/api/complete-goal', { goalID });
    handleClose();
    window.location.reload(false);
  };
  const handleUpdate = () => {
    const newData = {
      currentTitle: title,
      newTitle,
      currentGoal: goal,
      newGoal,
      currentDueDate: dueDate,
      newDueDate: newDate,
      currentSurvey: category, // 4 category
      newSurvey: newCat,
    };
    Axios.post('/api/update-goal', { newData })
      .then((res) => {
        if (res.status === 200) {
          handleUpdateClose();
        }
      })
      .catch((err) => {
        errorAlert('Something went wrong!');
        console.log(err);
      });
    window.location.reload(false);
  };
  if (!completed) {
    return (

      <Container>
        {modify ? (
          <Row className="badge-container" onClick={handleClickOpen}>
            <Col sm={2}>
              <img src={img} alt="cyber" className="badge" />
            </Col>
            <Col xs={5}>
              <div className="badge-desc">{title}</div>
            </Col>
            <Col xs={3} className="date">
              <div className="badge-date">{dueDate}</div>
            </Col>
            <Col xs={1} className="date">
              <IconButton className="custom-button">
                <CreateIcon />
              </IconButton>
            </Col>
            <Col xs={1} className="date">
              <IconButton className="custom-button">
                <DeleteOutlineIcon />
              </IconButton>
            </Col>
          </Row>
        )
          : (
            <Row xs={9} className="badge-container" onClick={handleClickOpen}>
              <Col sm={3}>
                <img src={img} alt="cyber" className="badge" />
              </Col>
              <Col xs={5}>
                <div className="badge-desc">{title}</div>
              </Col>
              <Col xs={4} className="date">
                <div className="badge-date">{dueDate}</div>
              </Col>
            </Row>
          )}
        {/* goal description */}
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth="sm"
          maxWidth="sm"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                className="center-container"
              >
                <Grid item xs>
                  <img src={img} alt="cyber" className="badge" />
                </Grid>
                <Grid item xs={10}>
                  <div className="badge-desc">{title}</div>
                </Grid>
              </Grid>
            </Box>
          </BootstrapDialogTitle>
          <DialogContent dividers className="center-container">
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                spacing={2}
                align="center"
                justify="center"
                className="center-container"
              >
                <Grid item xs={3} className="modal-title">
                  Details:
                </Grid>
                <Grid item xs={9} />
                <Grid item xs={4}>
                  Description:
                </Grid>
                <Grid item xs={8} className="left-align">
                  {goal}
                </Grid>
                <Grid item xs={4}>
                  Category:
                </Grid>
                <Grid item xs={8} className="left-align">
                  {category}
                </Grid>
                <Grid item xs={6}>
                  Created At:
                </Grid>
                <Grid item xs={6}>
                  Due Date:
                </Grid>
                <Grid item xs={6}>
                  {createDate}
                </Grid>
                <Grid item xs={6}>
                  {dueDate}
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions className="return-button">
            <Button onClick={handleClose}>
              Return
            </Button>
            <Button onClick={toggleUpdate}>
              Update
            </Button>
            <Button color="warning" onClick={toggleComplete}>
              Mark Completed
            </Button>
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          </DialogActions>
        </BootstrapDialog>
        {/* goal update */}
        <BootstrapDialog
          onClose={handleUpdateClose}
          aria-labelledby="customized-dialog-title"
          open={updateOpen}
          fullWidth="sm"
          maxWidth="sm"
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleUpdateClose}>
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                className="center-container"
              >
                <Grid item xs>
                  <img src={img} alt="cyber" className="badge" />
                </Grid>
                <Grid item xs={10}>
                  <div className="badge-desc">{goal}</div>
                </Grid>
              </Grid>
            </Box>
          </BootstrapDialogTitle>
          <DialogContent dividers className="center-container">
            <Box sx={{ width: '100%' }}>
              <Grid
                container
                spacing={2}
                align="center"
                justify="center"
                className="center-container"
              >
                <Grid item xs={4}>
                  New Title:
                </Grid>
                <Grid item xs={8} className="left-align">
                  <TextField
                    id="outlined-basic"
                    label={title}
                    variant="outlined"
                    onChange={(newValue) => {
                      setNewTitle(newValue.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  New Description:
                </Grid>
                <Grid item xs={8} className="left-align">
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      label={goal}
                      variant="outlined"
                      multiline
                      rows={4}
                      onChange={(newValue) => {
                        setNewGoal(newValue.target.value);
                      }}
                    />
                  </FormControl>

                </Grid>
                <Grid item xs={4}>
                  New Due Date:
                </Grid>
                <Grid item xs={8} className="left-align">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="mm/dd/yyyy"
                      inputFormat="MM/dd/yyyy"
                      onChange={(newValue) => {
                        setNewDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                  New Category:
                </Grid>
                <Grid item xs={8} className="left-align">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{category}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={category}
                      fullWidth="sm"
                      onChange={(newValue) => {
                        setNewCat(newValue.target.value);
                      }}
                    >
                      <MenuItem value="Health">Health</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                      <MenuItem value="Emergency">Emergency</MenuItem>
                      <MenuItem value="Cyber">Cyber Security</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions className="return-button">
            <Button onClick={handleClose}>
              Return
            </Button>
            <Button onClick={handleUpdate}>
              Apply
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Container>
    );
  }
  return (
    <Container>
      {cp ? (
        <Row className="badge-cp-container" onClick={handleClickOpen}>
          <Col sm={3}>
            <img src={img} alt="cyber" className="badge" />
          </Col>
          <Col xs={5}>
            <div className="badge-desc">{title}</div>
          </Col>
          <Col xs={4} className="date">
            <div className="badge-date">{dueDate}</div>
          </Col>
        </Row>
      )
        : (
          <Row xs="auto" className="badge-cp-container" onClick={handleClickOpen} style={{ disply: 'flex', justifyContent: 'left' }}>
            <Col sm={2}>
              <img src={img} alt="cyber" className="badge" />
            </Col>
            <Col xs={5}>
              <div className="badge-desc">{title}</div>
            </Col>
            <Col xs={3} className="date">
              <div className="badge-date">{dueDate}</div>
            </Col>
          </Row>
        )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth="sm"
        maxWidth="sm"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              spacing={0}
              align="center"
              justify="center"
              className="center-container"
            >
              <Grid item xs={2}>
                <img src={img} alt="cyber" className="badge" />
              </Grid>
              <Grid item xs={10}>
                <div className="badge-desc">{title}</div>
              </Grid>
            </Grid>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              spacing={2}
              align="center"
              justify="center"
              className="center-container"
            >
              <Grid item xs={3} className="modal-title">
                Details:
              </Grid>
              <Grid item xs={9} />
              <Grid item xs={4}>
                Description:
              </Grid>
              <Grid item xs={8} className="left-align">
                {goal}
              </Grid>
              <Grid item xs={4}>
                Category:
              </Grid>
              <Grid item xs={8} className="left-align">
                {category}
              </Grid>
              <Grid item xs={6}>
                Created At:
              </Grid>
              <Grid item xs={6}>
                Due Date:
              </Grid>
              <Grid item xs={6}>
                {createDate}
              </Grid>
              <Grid item xs={6}>
                {dueDate}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions className="return-button center-container">
          <Button autoFocus onClick={handleClose}>
            Return
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
};

export default AchievementCard;
