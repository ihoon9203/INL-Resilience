import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import TutorialContent from './TutorialContent';
import '../../styles/tutorial.css';
import welcomeImg from './images/welcomeINL.png';
import analysisPanelImg from './images/analysisPanel.png';
import aboutCardImg from './images/aboutCard.png';
import experienceCardImg from './images/experienceCard.png';
import goalsCardImg from './images/goalsCard.png';

const content = [
  {
    heading: 'Welcome!',
    image: welcomeImg,
    caption: 'We are so excited you\'re here! Since this is your first time, we\'ll help you get started with this tutorial.',
  },
  {
    heading: 'Analyze your Results Fast!',
    image: analysisPanelImg,
    caption: 'Here on your personal resilience dashboard, you can quickly see the overall score on the left. This score is based only on the surveys you\'ve taken. To the left, this is where you can see the score of each survey.',
  },
  {
    heading: 'Your One-Stop-Shop here!',
    image: aboutCardImg,
    caption: 'At the bottom of your personal resilience dashboard, there will be 4 survey cards. Here, you will be able to read a quick description of each survey.',
  },
  {
    heading: 'Survey Description Page',
    image: experienceCardImg,
    caption: 'If you click on View Category Details, this will take you to the description page. Here you can see your score for the survey, and access to other things.',
  },
  {
    heading: 'How to find a Survey:',
    image: welcomeImg,
    caption: 'On the Experience tab of the survey cards, this is also where you can take a survey!',
  },
  {
    heading: 'Taking a survey:',
    image: welcomeImg,
    caption: 'Now you can click through and take a survey like normal. Some sections may not apply to you, so you can check the \'Not Applicable\' checkbox. Doing this will not count against you in your score!',
  },
  {
    heading: 'Reviewing your Results:',
    image: welcomeImg,
    caption: 'Once you\'ve finished the survey, you can view your results right after. This is where you can see your score and what questions you can improve on!',
  },
  {
    heading: 'Your Personal Improvement Plan!',
    image: welcomeImg,
    caption: 'To help you improve your results, you will get a personally curated improvement plan after each survey you\'ve taken. This will give you tasks in order to improve your score! You can access it through the survey description page or your survey card on your dashboard.',
  },
  {
    heading: 'Setting Goals',
    image: goalsCardImg,
    caption: 'You can access your Goals and Achievements page from your survey cards, too! Here you can set personal custom goals to become more resilient!',
  },
  {
    heading: '...and that\'s it!',
    image: welcomeImg,
    caption: 'What are you waiting for? Go take your first survey and test your resiliency!',
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
    <Modal centered dialogClassName="tutorial-modal" show={props.show} onHide={props.handleClose}>
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
