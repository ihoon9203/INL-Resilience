import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) => ({
    
    buttons: {
        marginTop: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40px',
        variant: 'contained'
    },
    featureButtons: {
        height: '30px'
    },
    surveyButtons: {
        height: '40px',
    },
    box: {
        height: 100,
        display: 'flex',
        padding: 10,
        justify: 'center',
        alignItems: 'center'
    },
    smallbox: {
        display: 'flex',
        padding: 1
    },
    spreadBox: {
    justifyContent: "space-around",
    alignItems: "center"
    },

}));

export default useStyles;
