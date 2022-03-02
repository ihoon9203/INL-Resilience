import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MSTimeline from '../components/MSTimeline';
import CircularMilestone from '../components/CircularMilestone';
import IPGoals from '../components/IPGoals';
import CPGoals from '../components/CPGoals';
import '../styles/achievements.css';

const AchievementsPage = function AchievementsPageFunc() {
  // will be used in the future
  // const [healthScore, setHealthScore] = useState(0);
  // const [cyberScore, setCyberScore] = useState(0);
  // const [emergencyScore, setEmergencyScore] = useState(0);
  // const [financeScore, setFinanceScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [mstate, setMstate] = useState('Bad');
  const [cpGoal, setCPGoal] = useState([]);
  const [ipGoal, setIPGoal] = useState([]);
  const bullets = document.getElementsByTagName('li');
  // from all-scores
  useEffect(() => {
    Axios
      .get('/api/all-scores', { withCredentials: true })
      .then((res) => {
        let length = 1;
        if (Object.keys(res.data).length !== 0) {
          length = Object.keys(res.data).length;
        }
        let value = 0;
        const healthScore = typeof (res.data.health) !== 'undefined' ? res.data.health : 0;
        const emergencyScore = typeof (res.data.emergency) !== 'undefined' ? res.data.emergency : 0;
        const cyberScore = typeof (res.data.cyber) !== 'undefined' ? res.data.cyber : 0;
        const financeScore = typeof (res.data.finance) !== 'undefined' ? res.data.finance : 0;
        value = Math.round((healthScore + emergencyScore + cyberScore + financeScore) / length);
        setTotal(value);
        // setHealthScore(res.data.health);
        // setCyberScore(res.data.cyber);
        // setEmergencyScore(res.data.emergency);
        // setFinanceScore(res.data.finance);
        if (value / 20 < 1) {
          setMstate('Bad');
        } else if (value / 20 < 2) {
          setMstate('Poor');
        } else if (value / 20 < 3) {
          setMstate('Fair');
        } else if (value / 20 < 4) {
          setMstate('Good');
        } else {
          setMstate('Excellent');
        }
      });
    Axios
      .get('/api/ipgoal', { withCredentials: true })
      .then((res) => {
        setIPGoal(res.data);
      });
    Axios
      .get('/api/cpgoal', { withCredentials: true })
      .then((res) => {
        setCPGoal(res.data);
      });
  }, []);
  useEffect(() => {
    // eslint-disable-next-line prefer-const, no-restricted-syntax
    for (const bullet of bullets) {
      if (bullet.className === mstate) {
        bullet.classList.add('current');
      } else {
        bullet.classList.remove('current');
      }
    }
  }, []);
  // Goals
  // you get list of most recent two goals for each completed and in-progress in this axios request
  // and pass them to IPGoals and CPGoals respectively
  return (
    <Container>
      <Row>
        <div className="achievements-title">MILESTONE</div>
      </Row>
      <Row>
        <Col className="center-content">
          <Row>
            <div className="achievements-sub-title">Current Milestone</div>
          </Row>
          <Row>
            <div className="content"><MSTimeline /></div>
          </Row>
        </Col>
        <Col className="center-content">
          <Row>
            <div className="achievements-sub-title">Next Milestone</div>
          </Row>
          <Row>
            <div className="content"><CircularMilestone value={total} state={mstate} /></div>
          </Row>
        </Col>
      </Row>
      <div className="divbreak" />
      <Row className="mtop">
        <div className="achievements-title">GOALS</div>
      </Row>
      <Row className="nopadding">
        <Col className="center-content">
          <Row>
            <div className="achievements-sub-title">IN PROGRESS</div>
          </Row>
          <Row>
            <div className="content"><IPGoals goal={ipGoal} /></div>
          </Row>
        </Col>
        <Col className="center-content">
          <Row>
            <div className="achievements-sub-title">ACCOMPLISHED</div>
          </Row>
          <Row>
            <div className="content"><CPGoals goal={cpGoal} /></div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AchievementsPage;
