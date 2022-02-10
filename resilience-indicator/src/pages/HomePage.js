import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Grid } from '@material-ui/core';
import Axios from 'axios';
import Box from '@mui/material/Box';
import { Typography } from '@material-ui/core';
// import INLCarousel from '../components/Carousel';
// import Gauge from '../components/Gauge';
// import BarGraph from '../components/BarGraph';
// import CategoryCard from '../components/CategoryCard';
// import useStyles from '../styles';
import '../styles/analysistab.css';

const HomePage = function HomePageFunc() {
  // const classes = useStyles();
  const [healthScore, setHealthScore] = useState(0);

  useEffect(() => {
    Axios
      .get('/api/all-scores', { withCredentials: true })
      .then((res) => {
        setHealthScore(res.data.health);
      });
  });

  return (
    <Box mt={2} ml={2} sx={{ width: '60%' }}>
      <Typography color="primary" variant="h3" id="about-us-title">
        INL Personal Resilience Mission
      </Typography>
      <Typography component="span" variant="body1">
        Idaho National Laboratories is working towards a safer America.
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
        {healthScore}
      </Typography>
    </Box>

  // <>
  //   <INLCarousel />
  //   <Container maxWidth="xl">
  //     <h1 className="title">Resilience Indicator</h1>
  //     <h2 className="inl">idaho national laboratory</h2>
  //     <p>
  //       This is your personal resiliency dashboard! Here you can take surveys and see your scores.
  //       Set goals and get personally curated improvement plans based on your responses!
  //       Advancing resilience is a long-term process, but your personal resilience dashboard should
  //       help you reach your goals!
  //       Individual resilience involves behaviors, thoughts, and actions that promote personal
  //       wellbeing and mental health. People can develop the ability to withstand, adapt to, and
  //       recover from stress and adversity—and maintain or return to a state of mental health
  //       wellbeing—by using effective coping strategies.
  //     </p>
  //   </Container>
  //   <section className="columns">
  //     <div className="column">
  //       <div className="text-center"><h1>Your Overall Resilience Score</h1></div>
  //       <Gauge score={60} style={{ width: '100%', height: '500px' }} size={60} />
  //     </div>
  //     <div className="column">
  //       <Container className="panel">
  //         <h3 className="bargraph-title">Improve your Resiliency Now!</h3>
  //         <Link to="/description/health"><BarGraph className="panel-item health" category="Health" score={healthScore} /></Link>
  //         <Link to="/description/emergency"><BarGraph className="panel-item emergency" category="Emergency" score={50} /></Link>
  //         <Link to="/description/cyber"><BarGraph className="panel-item cyber" category="Cyber Security" score={70} /></Link>
  //         <Link to="/description/finance"><BarGraph className="panel-item finance" category="Finance" score={100} /></Link>
  //       </Container>
  //     </div>
  //   </section>
  //   <Container className={classes.cardGrid} alignItems="center" maxWidth="xl">
  //     <Grid container spacing={2} justify="center">
  //       <Grid item xs={12} sm={6} md={5} lg={3}>
  //         <CategoryCard cardID="cyber" category="Cyber Security" score={70} status="completed" description="The protection of computer systems and networks from information disclosure, theft, damage, and disruption or misdirection of services." />
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={5} lg={3}>
  //         <CategoryCard cardID="emergency" category="Emergency" score={0} status="in-progress" description="Serious, unexpected, and often dangerous situations resulting in a state that requires immediate action and or intervention." />
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={5} lg={3}>
  //         <CategoryCard cardID="finance" category="Financial" score={89} status="completed" description="The management, creation, and study of money and investments. Money management and the process of acquiring needed funds." />
  //       </Grid>
  //       <Grid item xs={12} sm={6} md={5} lg={3}>
  //         <CategoryCard cardID="health" category="Public Health" score={70} status="completed" description="The science of protecting and improving the health of people and their communities through treatements and preventative measures." />
  //       </Grid>
  //     </Grid>
  //   </Container>
  // </>
  );
};

export default HomePage;
