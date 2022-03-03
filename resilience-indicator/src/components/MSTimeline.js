import React, { useState, useEffect } from 'react';
import '../styles/mstimeline.css';

// eslint-disable-next-line no-unused-vars
const MSTimeline = function timelineFunc(props) {
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
  }, [props]);
  return (
    <ol className="steps">
      <li className={badClass}>
        <a href="#">Bad</a>
      </li>
      <li className={poorClass}>
        <a href="#">Poor</a>
      </li>
      <li className={fairClass}>
        <a href="#">Fair</a>
      </li>
      <li className={goodClass}>
        <a href="#">Good</a>
      </li>
      <li className={excellentClass}>
        <a href="#">Excellent</a>
      </li>
    </ol>
  );
};
export default MSTimeline;
