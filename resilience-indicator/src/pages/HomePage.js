import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
import Gauge from '../components/Gauge';
import SurveyPanel from '../components/SurveyPanel';
import BarGraph from '../components/BarGraph';

const HomePage = function HomePageFunc() {
  useEffect(() => {
    if (window.innerWidth < 371) {
      const image = document.querySelector('.inl-logo');
      image.style.height = '35px';
    }
    if (window.innerWidth < 300) {
      const image = document.querySelector('.inl-logo');
      image.style.height = '30px';
    }
  });
  return (
    <>
      <section className="columns">
        <div className="column">
          <div className="text-center"><h1>Your Overall Resilience Score</h1></div>
          <Gauge score={60} style={{ width: '100%', height: '500px' }} size={60} />
        </div>
        <div className="column">
          <Container className="panel">
            <h3 className="bargraph-title">Improve your Resiliency Now!</h3>
            <Link to="/description/health"><BarGraph className="panel-item health" category="Health" score={0} /></Link>
            <Link to="/description/emergency"><BarGraph className="panel-item emergency" category="Emergency" score={80} /></Link>
            <Link to="/description/cyber"><BarGraph className="panel-item cyber" category="Cyber Security" score={40} /></Link>
            <Link to="/description/finance"><BarGraph className="panel-item finance" category="Finance" score={60} /></Link>
          </Container>
        </div>
      </section>
      <Box mt={2} ml={2} mb={3} sx={{ width: '80%' }}>
        <Typography color="primary" variant="h3" id="about-us-title">
          Welcome to the Resilience Indicator!
        </Typography>
        <Typography variant="p">
          This is your personal resiliency dashboard! Here you can take surveys and see your scores.
          Set goals and get personally curated improvement plans based on your responses!
          Advancing resilience is a long-term process, but your personal resilience dashboard should
          help you reach your goals!
          <div />
          Individual resilience involves behaviors, thoughts, and actions that promote personal
          wellbeing and mental health. People can develop the ability to withstand, adapt to, and
          recover from stress and adversity—and maintain or return to a state of mental health
          wellbeing—by using effective coping strategies.
        </Typography>
      </Box>
      <Container>
        <Row className="panel-row">
          <Col>
            <Link className="survey-list-item" to="/description/finance">
              <SurveyPanel category="Financial" score={80} progress={100} />
            </Link>
          </Col>
          <Col>
            <Link className="survey-list-item" to="/description/emergency">
              <SurveyPanel category="Emergency" score={-1} progress={30} />
            </Link>
          </Col>
        </Row>
        <Row className="panel-row">
          <Col>
            <Link className="survey-list-item" to="/description/health">
              <SurveyPanel category="Health" score={-1} progress={70} />
            </Link>
          </Col>
          <Col>
            <Link className="survey-list-item" to="/description/cyber">
              <SurveyPanel category="Cyber" score={50} progress={100} />
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
