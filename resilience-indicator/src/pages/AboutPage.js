import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';

const AboutPage = function AboutPageFunc() {
  return (
    <Box mt={2} ml={2} sx={{ width: '60%' }}>
      <Typography color="primary" variant="h3" id="about-us-title">
        INL Personal Resilience Mission
      </Typography>
      <Typography component="span" variant="body1">
        Idaho National Laboratory is working towards a more resilient America.
        Advancing resilience is a long-term process, but can be coordinated around visible,
        short-term goals that allow individuals and organizations to measure or mark their
        progress toward becoming resilient and overcoming these gaps.
        <br />
        <br />
        Individual resilience involves behaviors, thoughts, and actions that promote personal
        wellbeing and mental health. People can develop the ability to withstand, adapt to, and
        recover from stress and adversity—and maintain or return to a state of mental health
        wellbeing—by using effective coping strategies.
        <br />
        <br />
      </Typography>
    </Box>
  );
};

export default AboutPage;
