import React from 'react';
import '../styles/mstimeline.css';

const MSTimeline = function timelineFunc() {
  return (
    <ol className="steps">
      <li className="Bad">
        <a href="#">Bad</a>
      </li>
      <li className="Poor">
        <a href="#">Poor</a>
      </li>
      <li className="Fair">
        <a href="#">Fair</a>
      </li>
      <li className="Good">
        <a href="#">Good</a>
      </li>
      <li className="Excellent">
        <a href="#">Excellent</a>
      </li>
    </ol>
  );
};
export default MSTimeline;
