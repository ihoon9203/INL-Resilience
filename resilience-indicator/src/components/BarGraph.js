import React, { useState } from 'react';

const BarGraph = function Bargraph(props) {
  let theme = useState(0);
  let scoreStyle = useState(null);
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
        <div className="progress-label progress-procent">{props.score}</div>
      </div>
    </div>
  );
};
export default BarGraph;
