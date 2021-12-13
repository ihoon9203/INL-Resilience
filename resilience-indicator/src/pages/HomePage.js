import React from 'react';
import { Col, Container, Row} from 'react-bootstrap';
import Gauge from '../components/Gauge';
import SurveyPanel from '../components/SurveyPanel';
import { Link } from "react-router-dom";
const HomePage = () => (
    <>
        <h1 className="centered-header">Your Overall Resilience Score</h1>
        <Gauge score={60} style={{width: "100%", height: "500px" }} size = {60} ></Gauge>
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
        <Link className="survey-list-item" to={`/description/finance`}>    
            <SurveyPanel category = {"Financial"} score = {80} progress = {100}/>
        </Link>
        </Col>
        <Col>
        <Link className="survey-list-item" to={`/description/emergency`}> 
            <SurveyPanel category = {"Emergency"} score = {-1} progress = {30}/>
        </Link>
        </Col>
        </Row>
        <Row className="panel-row">
        <Col>
        <Link className="survey-list-item" to={`/description/health`}> 
        <SurveyPanel category = {"Health"} score = {-1} progress = {70}/>
        </Link>
        </Col>
        <Col>
        <Link className="survey-list-item" to={`/description/cyber`}> 
        <SurveyPanel category = {"Cyber"} score = {50} progress = {100}/>
        </Link>
        </Col>
        </Row>
        </Container>
    </>
);

export default HomePage;