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
    bottom: 150,
    left: 80,
    width: '100%',
    padding: '10px',
  },
  carouselButtons: {
    height: 40,
    left: 80,
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
