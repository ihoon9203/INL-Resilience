import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/goals.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Container } from 'react-bootstrap';

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
  const [open, setOpen] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [goal, setGoal] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  console.log(props);
  useEffect(() => {
    if (props.goal !== undefined) {
      setGoal(props.goal.goal);
      setImg(props.goal.surveyId);
      setDueDate(props.goal.dueDate);
      setCompleted(props.goal.completed);
      const cat = props.goal.surveyId;
      switch (cat) {
      case 1:
        setImg('./assets/finance_badge.png');
        break;
      case 2:
        setImg('./assets/emergency_badge.png');
        break;
      case 3:
        setImg('./assets/health_badge.png');
        break;
      case 4:
        setImg('./assets/cyber_badge.png');
        break;
      default:
        setImg('./assets/nocat_badge.png');
        break;
      }
    }
  }, [props]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (!completed) {
    return (
      <Container>
        <Row className="badge-container" onClick={handleClickOpen}>
          <Col sm={2}>
            <img src={img} alt="cyber" className="badge" />
          </Col>
          <Col xs={7}>
            <div className="badge-desc">{goal}</div>
          </Col>
          <Col xs={3} className="date">
            <div className="badge-date">{dueDate}</div>
          </Col>
        </Row>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Modal title
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
              Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
              magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
              ullamcorper nulla non metus auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions className="return-button">
            <Button autoFocus onClick={handleClose}>
              Return
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Container>
    );
  }
  return (
    <Container>
      <Row className="badge-cp-container" onClick={handleClickOpen}>
        <Col sm={2}>
          <img src={img} alt="cyber" className="badge" />
        </Col>
        <Col xs={7}>
          <div className="badge-desc">{goal}</div>
        </Col>
        <Col xs={3} className="date">
          <div className="badge-date">{dueDate}</div>
        </Col>
      </Row>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions className="return-button">
          <Button autoFocus onClick={handleClose}>
            Return
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Container>
  );
};

export default AchievementCard;
