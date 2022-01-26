import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Gauge from '../components/Gauge';
import SurveyPanel from '../components/SurveyPanel';
import BarGraph from '../components/BarGraph';

const HomePage = function HomePageFunc() {
  useEffect(() => {
    if (window.innerWidth < 371) {
      const image = document.querySelector('.inl-logo');
      console.log(image);
      image.style.height = '35px';
    }
    if (window.innerWidth < 300) {
      const image = document.querySelector('.inl-logo');
      console.log(image);
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
          <Container className="bar-container">
            <h3 className="bargraph-title">Improve your Resiliency Now!</h3>
            <BarGraph category="Health" score={0} />
            <BarGraph category="Emergency" score={80} />
            <BarGraph category="Cyber Security" score={40} />
            <BarGraph category="Finance" score={60} />
          </Container>
        </div>
      </section>
      <h1>Welcome to the Resilience Indicator!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
        deserunt mollit anim id est laborum.
      </p>
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
