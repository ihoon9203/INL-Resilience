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
  chipSuccess: {
    padding: '5px',
  },
  divider: {
    height: '5%',
    width: '100%',
    border: '2px solid #3f51b5',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  featureButtons: {
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
  },
  surveyButtons: {
    height: '40px',
  },
}));

export default useStyles;
