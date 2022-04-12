import React from 'react';
import { Grid } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Gauge from './Gauge';
import '../styles/subpanel.css';

const AnalysisPanel = function AnalysisPanelFunc(props) {
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
      </section>
    );
  }
  return null;
};
export default AnalysisPanel;
