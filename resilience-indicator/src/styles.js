import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  answer: {
    padding: '20px 0px 0px 40px',
  },
  box: {
    height: 100,
    display: 'flex',
    padding: '10px',
    justify: 'center',
    alignItems: 'center',
  },
  buttons: {
    marginTop: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '40px',
    variant: 'contained',
  },
  card: {
    margin: '30px 20px 20px 20px',
  },
  cardGrid: {
    padding: '30px 20px',
  },
  carouselBox: {
    position: 'absolute',
    bottom: -200,
    left: -180,
    width: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '50%',
    borderColor: 'rgba(255, 255, 255)',
    borderWidth: 5,
    height: 900,
  },
  carouselButtons: {
    height: 40,
    left: 80,
  },
  carouselTitle: {
    position: 'relative',
    top: 240,
    left: '4vw',
    fontWeight: 350,
    color: 'rgba(255, 255, 255)',
    marginTop: 40,
    marginLeft: 200,
  },
  carouselText: {
    position: 'relative',
    top: 220,
    left: '4vw',
    fontSize: 18,
    color: 'rgba(255, 255, 255)',
    marginLeft: 200,
  },
  chipSuccess: {
    padding: '5px',
  },
  divider2: {
    width: '100%',
    padding: '.4rem',
    marginTop: '8px',
    background: 'linear-gradient( to right, rgba(83, 200, 239, 0.8) 0%, rgba(81, 106, 204, 2) 100%)',
  },
  featureButtons: {
    marginTop: '20px',
    height: '30px',
  },
  header: {
    fontFamily: 'Myriad Pro Arial sans-serif',
  },
  progressbox: {
    marginTop: '30px',
    height: '50%',
    border: '3px solid #3f51b5',
    padding: 5,
    borderRadius: 8,
  },
  smallbox: {
    display: 'flex',
    padding: '1px',
    textAlign: 'center',
  },
  surveyButtons: {
    marginLeft: '20px',
    marginRight: '20px',
    height: '40px',
  },
}));

export default useStyles;
