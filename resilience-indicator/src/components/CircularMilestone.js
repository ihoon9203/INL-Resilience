import React, { useEffect, useState } from 'react';
import '../styles/milestone.css';

const CircularMilestone = function CircularMilestoneFunc(props) {
  const [nextState, setNextState] = useState('Bad');
  useEffect(() => {
    if (props.state === 'Bad') {
      setNextState('Poor');
    } else if (props.state === 'Poor') {
      setNextState('Fair');
    } else if (props.state === 'Fair') {
      setNextState('Good');
    } else if (props.state === 'Good') {
      setNextState('Excellent');
    } else if (props.state === 'Excellent') {
      setNextState('Perfect');
    }
  });
  if (props.value < 100) {
    return (
      <div className="dial dial--positive">
        <div className="dial__progress" data-percent={((props.value % 20)) * 5} />
        <div className="dial__content">
          <div className="radial_text content">
            {20 - (props.value % 20)}
            pts
            <br />
            <div className="small-text">- Away -</div>
          </div>
        </div>
        <div className="ms-status">{nextState}</div>
      </div>
    );
  }
  if (Number.isNaN(props.value)) {
    return (
      <div className="dial dial--positive">
        <div className="dial__progress" data-percent={0} />
        <div className="dial__content">
          <div className="radial_text content">
            {20}
            pts
            <br />
            <div className="small-text">- Away -</div>
          </div>
        </div>
        <div className="ms-status">Take Survey</div>
      </div>
    );
  }
  return (
    <div className="dial dial--positive">
      <div className="dial__progress" data-percent={100} />
      <div className="dial__content">
        <div className="radial_text content">
          --
        </div>
      </div>
      <div className="ms-status">RESILIENT!</div>
    </div>
  );
};

export default CircularMilestone;
