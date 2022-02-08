import React, { useState } from 'react';
import Axios from 'axios';

const BarGraph = function Bargraph(props) {
  let theme = useState(0);
  let scoreStyle = useState(null);
  let score = useState(0);

  useState(() => {
    Axios({
      method: 'GET',
      // withCredentials: true, // include access of the cookie.
      url: '/api/all-scores',
    }).then(async (res) => {
      // redirect to home page upon success
      if (res.status === 200) {
        const scoreList = res.data;
        if (props.category === 'Health') {
          score = scoreList.health;
        } else if (props.category === 'Emergency') {
          score = scoreList.emergency;
        } else if (props.category === 'Finance') {
          score = scoreList.finance;
        } else {
          score = scoreList.cyber;
        }
      }
    });
  });
  useState(() => {
    if (props.category === 'Health') {
      theme = 'progress-active progress-theme-1';
    } else if (props.category === 'Emergency') {
      theme = 'progress-active progress-theme-2';
    } else if (props.category === 'Finance') {
      theme = 'progress-active progress-theme-3';
    } else {
      theme = 'progress-active progress-theme-4';
    }
    scoreStyle = {
      width: `${props.score}%`,
    };
  });
  return (
    <div className="panel-item">
      <div className="progress">
        <div className="progress-label progress-name">{props.category}</div>
        <div className="progress-line">
          <div className={theme} style={scoreStyle} />
        </div>
        <div className="progress-label progress-procent">{score}</div>
      </div>
    </div>
  );
};
export default BarGraph;
