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
        let length = 1;
        if (Object.keys(res.data).length !== 0) {
          length = Object.keys(res.data).length;
        }
        const thisHealthScore = typeof (res.data.health) !== 'undefined' ? res.data.health : 0;
        const thisEmergencyScore = typeof (res.data.emergency) !== 'undefined' ? res.data.emergency : 0;
        const thisCyberScore = typeof (res.data.cyber) !== 'undefined' ? res.data.cyber : 0;
        const thisFinanceScore = typeof (res.data.finance) !== 'undefined' ? res.data.finance : 0;
        setTotal(Math.round((thisHealthScore + thisEmergencyScore + thisCyberScore + thisFinanceScore) / length));
        setHealthScore(thisHealthScore);
        setCyberScore(thisCyberScore);
        setEmergencyScore(thisEmergencyScore);
        setFinanceScore(thisFinanceScore);
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
          Welcome to the Personal Resilience Index! It is a simple and an easy-to-use tool providing
          an overall resilience score in addition to individual scores for the four most relevant
          categories in disaster situations. This quick and convenient quiz helps users find out their
          resiliency score to natural and man-made disasters.
        </p>
        <p>
          Participation is anonymous and involves taking a voluntary survey, that will take 5-10 minutes.
          Open to individuals 18 and older, the calculator allows the user to stay current with a
          personalized dashboard which gives users the power to take charge of their personal resilience.
        </p>
        <p>
          There is a lot of disparate and conflicting information on what individuals can do to be more
          resilient against natural and man-made disasters as well as how to be more resilient in an
          increasingly infrastructure-interconnected world. We aim to address these issues through the
          Personal Resilience Index. Advancing resilience is a long-term process, but your personal
          resilience dashboard should help you reach your goals!
        </p>
      </Container>
      <AnalysisPanel login={login} total={total} health={healthScore} emergency={emergencyScore} cyber={cyberScore} finance={financeScore} />
      <Container className={classes.cardGrid} alignItems="center" maxWidth="xl">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="cyber"
              category="Cyber Security"
              cardscore={cyberScore}
              icon="https://img.icons8.com/nolan/128/keepass.png"
              description="The protection of computer systems and networks from information disclosure, theft, damage, and disruption or misdirection of services."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="emergency"
              category="Emergency"
              cardscore={emergencyScore}
              icon="../assets/emergency_icon.png"
              description="Serious, unexpected, and often dangerous situations resulting in a state that requires immediate action and or intervention."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="finance"
              category="Financial"
              cardscore={financeScore}
              icon="../assets/finance_icon2.png"
              description="The management, creation, and study of money and investments. Money management and the process of acquiring needed funds."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="health"
              category="Public Health"
              cardscore={healthScore}
              icon="../assets/health_icon.png"
              description="The science of protecting and improving the health of people and their communities through treatements and preventative measures."
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
