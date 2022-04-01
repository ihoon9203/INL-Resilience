/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../styles/subpanel.css';

const LevelCard = function LevelCardFunc(props) {
  return (
    <div className="level-card">
      <div className="div1">Resiliency Level</div>
      <div className="div2">
        <img src={props.level} alt="" className="level-number" />
      </div>
    </div>
  );
};
export default LevelCard;
