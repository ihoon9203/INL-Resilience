import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { Col, Row } from 'react-bootstrap';
import { Container } from '@material-ui/core';
import Gauge from './Gauge';
import BarGraph from './BarGraph';
import LevelCard from './LevelCard';
import '../styles/subpanel.css';

const ToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
};

const AnalysisPanel = function AnalysisPanelFunc(props) {
  const [level, setLevel] = useState('/assets/number-0.png');
  useEffect(() => {
    let score = 0;
    if (props.health !== 0) {
      score += 1;
    }
    if (props.emergency !== 0) {
      score += 1;
    }
    if (props.finance !== 0) {
      score += 1;
    }
    if (props.cyber !== 0) {
      score += 1;
    }
    setLevel(`/assets/number-${score}.png`);
  });
  if (props.login) {
    return (
      <section className="columns">
        <div className="column">
          <Grid container justifyContent="center" alignItems="center">
            <h1 className="bargraph-title2">Your Overall Resilience Index</h1>
            <Tooltip title="Your Overall Resilience Index is calculated from your completed surveys. Uncompleted surveys do not impact the overall score.">
              <InfoIcon className="tool-tip-index" />
            </Tooltip>
          </Grid>
          <Gauge score={props.total} style={{ width: '100%', height: '500px' }} size={60} />
        </div>
        {(() => { // currently right panel is deprecated.
          if (false) {
            <div className="column">
              <Container className="panel">
                <h3 className="text-center bargraph-title">Complete all surveys to increase Resiliency Level!</h3>
                <Row className="mt-3">
                  <Col xs={12}>
                    <LevelCard level={level} />
                  </Col>
                </Row>
                <div className="divbreak-subpanel" />
                <Link to="/description/health"><BarGraph className="panel-item health" category="Health" score={props.health} /></Link>
                <Link to="/description/emergency"><BarGraph className="panel-item emergency" category="Emergency" score={props.emergency} /></Link>
                <Link to="/description/cyber"><BarGraph className="panel-item cyber" category="Cyber Security" score={props.cyber} /></Link>
                <Link to="/description/finance"><BarGraph className="panel-item finance" category="Finance" score={props.finance} /></Link>
                <Row className="mt-3">
                  <Col>
                    <Button onClick={ToBottom} className="subpanel-button">Complete more Surveys</Button>
                  </Col>
                </Row>
              </Container>
            </div>;
          }
        })}
      </section>
    );
  }
  return null;
};
export default AnalysisPanel;
