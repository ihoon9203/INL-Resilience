import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import Axios from 'axios';
import INLCarousel from '../components/Carousel';
import CategoryCard from '../components/CategoryCard';
import useStyles from '../styles';
import AnalysisPanel from '../components/AnalysisPanel';
import Tutorial from '../components/tutorial/Tutorial';
import MobileWelcome from '../components/MobileWelcome';
import '../styles/analysistab.css';

const HomePage = function HomePageFunc() {
  const classes = useStyles();
  const [healthScore, setHealthScore] = useState(0);
  const [cyberScore, setCyberScore] = useState(0);
  const [emergencyScore, setEmergencyScore] = useState(0);
  const [financeScore, setFinanceScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [login, setLogin] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const { state } = useLocation();

  // Tutorial stuff
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tutorialIdx, setTutorialIdx] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 600) {
      setMobileView(true);
    }
    if (state !== null && state.checkShowTutorial) {
      Axios
        .get('/api/times-visited', { withCredentials: true })
        .then((res) => {
          if (res.data <= 2) {
            setShow(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    Axios
      .get('/api/latest-scores', { withCredentials: true })
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
      .get('/api/logged-in', { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setLogin(true);
        }
      });
  }, [healthScore, cyberScore, emergencyScore, financeScore, total]);
  return (
    <>
      { mobileView ? <MobileWelcome /> : <INLCarousel />}
      <Tutorial show={show} handleClose={handleClose} handleShow={handleShow} index={tutorialIdx} setIndex={setTutorialIdx} setShow={setShow} />
      <Container maxWidth="lg">
        <h1 className="title">Resilience Indicator</h1>
        <h2 className="inl">idaho national laboratory</h2>
        <p className="display-text">
          Welcome to the Personal Resilience Index! It is a simple and easy-to-use tool providing
          an overall resilience score in addition to individual scores for the four most relevant
          categories in disaster situations. This quick and convenient quiz helps users find out their
          resiliency score to natural and man-made disasters.
        </p>
        <p className="display-text">
          Participation is anonymous and involves taking a voluntary survey, that will take 5-10 minutes.
          Open to individuals 18 and older, the calculator allows the user to stay current with a
          personalized dashboard which gives users the power to take charge of their personal resilience.
        </p>
        <p className="display-text">
          There is a lot of disparate and conflicting information on what individuals can do to be more
          resilient against natural and man-made disasters as well as how to be more resilient in an
          increasingly infrastructure-interconnected world. We aim to address these issues through the
          Personal Resilience Index. Advancing resilience is a long-term process, but your personal
          resilience dashboard should help you reach your goals!
        </p>
        <Box className={classes.divider2} style={{ marginBottom: '40px' }} />
      </Container>
      <AnalysisPanel login={login} total={total} health={healthScore} emergency={emergencyScore} cyber={cyberScore} finance={financeScore} />
      <Container className={classes.cardGrid} alignitems="center" maxWidth="xl">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="cyber"
              category="Cyber Security"
              cardscore={cyberScore}
              icon="../assets/keep_pass.png"
              login={login}
              description="The protection of computer systems and networks from information disclosure, theft, damage, and disruption of services."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="emergency"
              category="Emergency"
              cardscore={emergencyScore}
              icon="../assets/emergency_icon.png"
              login={login}
              description="Serious, unexpected, and often dangerous situations resulting in a state that requires immediate action and/or intervention."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="finance"
              category="Financial"
              cardscore={financeScore}
              icon="../assets/finance_icon2.png"
              login={login}
              description="The creation and study of money and investments. Money management and the process of acquiring needed funds."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3}>
            <CategoryCard
              cardcatid="health"
              category="Public Health"
              cardscore={healthScore}
              icon="../assets/health_icon.png"
              login={login}
              description="The science of protecting and improving the health of people and their communities through treatements and prevention."
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
