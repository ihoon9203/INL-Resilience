import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'react-bootstrap/ProgressBar';

const SurveyPanel = function SurveyPanelFunc({ category, progress, score }) {
  let progressCondition;
  if (progress <= 30) progressCondition = 'danger';
  else if (progress <= 70) progressCondition = 'warning';
  else progressCondition = 'info';
  return (
    <>
      <h1 className="text-center">{category}</h1>
      <div className="wrapper">
        <div className="img-container">
          <img src="./assets/hexagon.PNG" alt="hexagon shape" className="panel-border" />
          <div className="small-wrapper">
            {(() => {
              // survey not completed yet.
              if (score === -1) {
                return (
                  <ProgressBar
                    now={progress}
                    variant={progressCondition}
                    className="progress panel-progress"
                  />
                );
                // survey completed.
              }
              return (
                <>
                  <img
                    src="./assets/white.png"
                    alt="white background"
                    className="points-view"
                  />
                  <div className="points-text">{score}</div>
                </>
              );
            })()}
          </div>
        </div>
        <div className="img-container" />
      </div>
    </>
  );
};
SurveyPanel.propTypes = {
  category: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default SurveyPanel;
