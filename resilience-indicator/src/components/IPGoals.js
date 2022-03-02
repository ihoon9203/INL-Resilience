import React from 'react';
import '../styles/goals.css';
import { Link } from 'react-router-dom';
import AchievementCard from './AchievementCard';

const IPGoals = function IPGoalsFunc(props) {
  return (
    <div className="nopadding">
      <Link to="/goals" style={{ textDecoration: 'none' }}>
        <AchievementCard goal={props.goal[0]} />
      </Link>
      <Link to="/goals" style={{ textDecoration: 'none' }}>
        <AchievementCard goal={props.goal[1]} />
      </Link>
    </div>
  );
};

export default IPGoals;
