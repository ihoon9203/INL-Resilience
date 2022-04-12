import React from 'react';
import {
  List, Grid, ListItem,
} from '@mui/material';

import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

const SharePanel = function SharePanelFunc({ score, surveyName }) {
  const shareStr = `I Received A Score Of ${score} In The ${surveyName} Resilience Survey!\nTo Learn More About Your Resilience Head To The Site Below\n`;
  const shareUrl = 'https://resilience.inl.gov/';
  return (
    <Grid>
      <List style={{
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        boxSizing: 'border-box',
        maxWidth: '200px',
      }}
      >
        <ListItem>
          <FacebookShareButton
            url={shareUrl}
            quote={shareStr}
          >
            <FacebookIcon
              size={32}
              round
            />
          </FacebookShareButton>
        </ListItem>
        <ListItem>
          <TwitterShareButton
            url={shareUrl}
            title={shareStr}
          >
            <TwitterIcon
              size={32}
              round
            />
          </TwitterShareButton>
        </ListItem>
        <ListItem>
          <LinkedinShareButton
            url={shareUrl}
            title={shareStr}
          >
            <LinkedinIcon
              size={32}
              round
            />
          </LinkedinShareButton>
        </ListItem>
      </List>
    </Grid>
  );
};

export default SharePanel;
