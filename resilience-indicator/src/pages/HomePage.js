import React from 'react';
import { Col, Container, Row} from 'react-bootstrap';
import Gauge from '../components/Gauge';
import SurveyPanel from '../components/SurveyPanel';
const HomePage = () => (
    <>
        <h1 className="centered-header">Your Overall Resilience Score</h1>
        <Gauge score={60}></Gauge>
        <h1>Welcome to the Resilience Indicator!</h1>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
        </p>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
        </p>
        <Container>
        <Row className="panel-row">
        <Col>
        <SurveyPanel category = {"Financial"} score = {80} progress = {100}/>
        </Col>
        <Col>
        <SurveyPanel category = {"Emergency"} score = {-1} progress = {30}/>
        </Col>
        </Row>
        <Row className="panel-row">
        <Col>
        <SurveyPanel category = {"Health"} score = {-1} progress = {70}/>
        </Col>
        <Col>
        <SurveyPanel category = {"Cyber"} score = {50} progress = {100}/>
        </Col>
        </Row>
        </Container>
    </>
);

export default HomePage;