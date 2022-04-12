import React from 'react';
import '../styles/goals.css';
import { Link } from 'react-router-dom';
import AchievementCard from './AchievementCard';

const CPGoals = function CPGoalsFunc(props) {
  const goals = props.goal;
  return (
    <div className="nopadding">
      {goals.map((goal) => (
        <Link to="/goals" style={{ textDecoration: 'none' }}>
          <AchievementCard goal={goal} className="np" />
        </Link>
      ))}
    </div>
  );
};

export default CPGoals;
