import React from 'react';
import '../styles/analysistab.css';

const MilestoneBar = function MilestoneBarFunc({ category, score }) {
  const scoreStyle = {
    width: `${score}%`,
  };
  let theme = '';
  if (category === 'Health') {
    theme = 'progress-active progress-theme-1';
  } else if (category === 'Emergency') {
    theme = 'progress-active progress-theme-2';
  } else if (category === 'Finance') {
    theme = 'progress-active progress-theme-3';
  } else {
    theme = 'progress-active progress-theme-4';
  }
  return (
    <div className="panel-item">
      <div className="progress milestone">
        <div className="progress-label progress-name milestone-label">{category}</div>
        <div className="progress-line">
          <div className={theme} style={scoreStyle} />
        </div>
        <div className="progress-label progress-procent milestone-label">{score}</div>
      </div>
    </div>
  );
};

export default MilestoneBar;
