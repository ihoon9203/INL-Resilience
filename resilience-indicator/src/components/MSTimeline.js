import React, { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import '../styles/mstimeline.css';

// eslint-disable-next-line no-unused-vars
const MSTimeline = function timelineFunc(props) {
  const [score, setScore] = useState(0);
  const [badClass, setBadClass] = useState(['Bad']);
  const [poorClass, setPoorClass] = useState(['Poor']);
  const [fairClass, setFairClass] = useState(['Fair']);
  const [goodClass, setGoodClass] = useState(['Good']);
  const [excellentClass, setExcellentClass] = useState(['Excellent']);
  useEffect(() => {
    // eslint-disable-next-line prefer-const, no-restricted-syntax
    if (props.score === 'Bad') {
      setBadClass('Bad current');
    } else if (props.score === 'Poor') {
      setPoorClass('Poor current');
    } else if (props.score === 'Fair') {
      setFairClass('Fair current');
    } else if (props.score === 'Good') {
      setGoodClass('Good current');
    } else if (props.score === 'Excellent') {
      setExcellentClass('Excellent current');
    }
    setScore(props.value);
  }, [props]);
  return (
    <div className="bottom-pos">
      <div>
        <Tooltip title="The Milestone is calculated by total score you got from 4 resiliency surveys">
          <HelpOutlineIcon className="right-align" />
        </Tooltip>
      </div>
      <div className="score-description">
        {score}
        /100
      </div>
      <ol className="steps">
        <Tooltip title="Total score: 0~20" arrow>
          <li className={badClass}>
            <a href="#">Bad</a>
          </li>
        </Tooltip>
        <Tooltip title="Total score: 21~40" arrow>
          <li className={poorClass}>
            <a href="#">Poor</a>
          </li>
        </Tooltip>
        <Tooltip title="Total score: 41~60" arrow>
          <li className={fairClass}>
            <a href="#">Fair</a>
          </li>
        </Tooltip>
        <Tooltip title="Total score: 61~80" arrow>
          <li className={goodClass}>
            <a href="#">Good</a>
          </li>
        </Tooltip>
        <Tooltip title="Total score: 80~100" arrow>
          <li className={excellentClass}>
            <a href="#">Excellent</a>
          </li>
        </Tooltip>
      </ol>
    </div>
  );
};
export default MSTimeline;
