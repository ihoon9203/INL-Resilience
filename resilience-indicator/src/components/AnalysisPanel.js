import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Gauge from './Gauge';
import BarGraph from './BarGraph';

const AnalysisPanel = function AnalysisPanelFunc(props) {
  if (props.login) {
    return (
      <section className="columns">
        <div className="column">
          <div className="text-center"><h1>Your Overall Resilience Score</h1></div>
          <Gauge score={props.total} style={{ width: '100%', height: '500px' }} size={60} />
        </div>
        <div className="column">
          <Container className="panel">
            <h3 className="bargraph-title">Improve your Resiliency Now!</h3>
            <Link to="/description/health"><BarGraph className="panel-item health" category="Health" score={props.health} /></Link>
            <Link to="/description/emergency"><BarGraph className="panel-item emergency" category="Emergency" score={props.emergency} /></Link>
            <Link to="/description/cyber"><BarGraph className="panel-item cyber" category="Cyber Security" score={props.cyber} /></Link>
            <Link to="/description/finance"><BarGraph className="panel-item finance" category="Finance" score={props.finance} /></Link>
          </Container>
        </div>
      </section>
    );
  }
  return null;
};
export default AnalysisPanel;
