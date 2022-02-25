import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Axios from 'axios';
import INLCarousel from '../components/Carousel';
import CategoryCard from '../components/CategoryCard';
import useStyles from '../styles';
import AnalysisPanel from '../components/AnalysisPanel';
import '../styles/analysistab.css';

const HomePage = function HomePageFunc() {
  const classes = useStyles();
  const [healthScore, setHealthScore] = useState(0);
  const [cyberScore, setCyberScore] = useState(0);
  const [emergencyScore, setEmergencyScore] = useState(0);
  const [financeScore, setFinanceScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [login, setLogin] = useState(false);
  useEffect(() => {
    Axios
      .get('/api/all-scores', { withCredentials: true })
      .then((res) => {
        setTotal((res.data.health + res.data.cyber + res.data.emergency + res.data.finance) / Object.keys(res.data).length);
        setHealthScore(res.data.health);
        setCyberScore(res.data.cyber);
        setEmergencyScore(res.data.emergency);
        setFinanceScore(res.data.finance);
      });
    Axios
      .get('/api/logged_in', { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setLogin(true);
        }
      });
  }, [healthScore, cyberScore, emergencyScore, financeScore, total]);
  return (
    <>
      <INLCarousel />
      <Container maxWidth="xl">
        <h1 className="title">Resilience Indicator</h1>
        <h2 className="inl">idaho national laboratory</h2>
        <p>
          This is your personal resiliency dashboard! Here you can take surveys and see your scores.
          Set goals and get personally curated improvement plans based on your responses!
          Advancing resilience is a long-term process, but your personal resilience dashboard should
          help you reach your goals!
          Individual resilience involves behaviors, thoughts, and actions that promote personal
          wellbeing and mental health. People can develop the ability to withstand, adapt to, and
          recover from stress and adversity—and maintain or return to a state of mental health
          wellbeing—by using effective coping strategies.
        </p>
      </Container>
      <AnalysisPanel login={login} total={total} health={healthScore} emergency={emergencyScore} cyber={cyberScore} finance={financeScore} />
      <Container className={classes.cardGrid} alignItems="center" maxWidth="xl">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard cardID="cyber" category="Cyber Security" score={cyberScore} status="completed" description="The protection of computer systems and networks from information disclosure, theft, damage, and disruption or misdirection of services." />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard cardID="emergency" category="Emergency" score={emergencyScore} status="in-progress" description="Serious, unexpected, and often dangerous situations resulting in a state that requires immediate action and or intervention." />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard cardID="finance" category="Financial" score={financeScore} status="completed" description="The management, creation, and study of money and investments. Money management and the process of acquiring needed funds." />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard cardID="health" category="Public Health" score={healthScore} status="completed" description="The science of protecting and improving the health of people and their communities through treatements and preventative measures." />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
