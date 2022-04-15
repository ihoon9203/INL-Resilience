import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import TutorialContent from './TutorialContent';
import '../../styles/tutorial.css';
import aboutCardImg from './images/aboutCard.png';
import analysisPanelImg from './images/analysisPanel.png';
import cardsImg from './images/cardPanel.png';
import descriptionImg from './images/descriptionPage.png';
import experienceCardImg from './images/experienceCard.png';
import goalsImg from './images/goals.png';
import improvementPlanImg from './images/improvementPlan.png';
import getStartedImg from './images/letsGetStarted.jpg';
import milestoneImg from './images/milestone.png';
import welcomeImg from './images/welcomeINL.png';

const content = [
  {
    heading: 'Welcome!',
    image: welcomeImg,
    caption: 'We are so excited you\'re here! Since this is your first time, we\'ll help you get started with this tutorial. If you know you\'re way around already, feel free to skip this tutorial!',
  },
  {
    heading: 'Analyze your Results Fast!',
    image: analysisPanelImg,
    caption: 'On the home page you will find your personal resilience dashboard. If you have an account, you can quickly see your overall score here. This score is based only on the surveys you\'ve taken.',
  },
  {
    heading: 'Your One-Stop-Shop here!',
    image: cardsImg,
    caption: 'At the bottom of your personal resilience dashboard, there will be 4 cards: Cyber Security, Emergency, Financial, and Public Health. Each card gives you access to taking its survey, setting goals, viewing your improvement plan, and more. ',
  },
  {
    heading: 'About Tab',
    image: aboutCardImg,
    caption: 'In the \'About\' tab, you will have access to the survey\'s page once you\'ve taken the survey by clicking on View Category Details. This is only available if you have an account.',
  },
  {
    heading: 'Survey Page',
    image: descriptionImg,
    caption: 'The survey page displays your score for the survey, as well as access to other features, like retaking/updating the survey, seeing your progress, or viewing your personal improvement plan.',
  },
  {
    heading: 'How to find a Survey:',
    image: experienceCardImg,
    caption: 'On the \'Experience tab\' of the survey cards, this is where you can take a survey for the first time. If you\'ve already taken it, you can retake the survey or update any answers through here.',
  },
  {
    heading: 'Personal Improvement Plan:',
    image: improvementPlanImg,
    caption: 'Once you\'ve taken a survey, you will receive an improvement plan based on your responses. This will give you tasks that will help you improve your scores! You can set pre-determined goals based on these tasks. You can always come back to this through the survey description page or your survey card on your dashboard.',
  },
  {
    heading: 'Setting Goals:',
    image: goalsImg,
    caption: 'If you have an account, you can also set custom goals on the Goals and Achievements page, which is accessible through the Goals tab on the survey cards or the Achievements tab up on the top right of the home page. Click the \'+ New Goals\' to create them with your choice of title and due date!',
  },
  {
    heading: 'Keep Track of Your Milestones:',
    image: milestoneImg,
    caption: 'We also keep track of your score milestone on the Goals and Achievements Page, so you can see if you\'re overall score is in the bad, poor, fair, good, or excellent range.',
  },
  {
    heading: '...and that\'s it!',
    image: getStartedImg,
    caption: 'What are you waiting for? Get started and take your first survey to test your resiliency! On behalf of Idaho National Laboratories, we hope you enjoy!',
  },
];

const Tutorial = function Tutorial(props) {
  const handleNext = () => {
    if (props.index + 1 > content.length - 1) {
      props.setShow(false);
    } else {
      props.setIndex(props.index + 1);
    }
  };

  return (
    <Modal dialogClassName="modal-fixed-height" onHide={props.handleClose} show={props.show} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{content[props.index].heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TutorialContent page={content[props.index]} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Skip
        </Button>
        <Button variant="primary" onClick={handleNext}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Tutorial;
