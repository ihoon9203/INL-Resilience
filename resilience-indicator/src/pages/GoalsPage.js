/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/goals.css';
import AchievementCard from '../components/AchievementCard';

const GoalsPage = function AchievementsPageFunc() {
  const [goals, setGoals] = useState([]);
  useEffect(() => {
    Axios.get('/api/goal', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setGoals(res.data);
      });
  }, []);
  const getGoalCards = goals.map((goal) => <AchievementCard goal={goal} />);
  return (
    <div>
      <Container>
        <Row>
          <div className="achievements-title">GOALS</div>
        </Row>
        <Row>
          <Col>
            <div className="goals-list">
              {getGoalCards}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GoalsPage;
