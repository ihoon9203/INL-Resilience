import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import Gauge from '../components/Gauge';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import { Box, Button } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import ProgressBar from 'react-bootstrap/ProgressBar'


const DescriptionPage = () => {
    const classes = useStyles();
    const { name } = useParams();
    const survey = surveyDescriptions.find(
        survey => survey.name === name
    )

    if (!survey) return <NotFoundPage />

    return (
        <>
            <h1>{survey.title}</h1>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Gauge score={60} style={{width: "100%", height: "100%" }} ></Gauge>
                </Grid>
                <Grid item xs container direction="column" spacing={2} columnSpacing={1}>
                    <Grid item xs={6}>
                        <Box component="span" m={2} className={classes.smallbox}>
                            <Button className={classes.featureButtons} variant="contained" color="primary">
                                Personal Improvement Plan
                            </Button>
                        </Box>
                        <Box component="span" m={2} className={classes.smallbox}>
                            <Button className={classes.featureButtons} variant="contained" color="primary">
                                Achievements/Goals
                            </Button>
                        </Box>
                    </Grid>
                    <Box component="span" m={1} className={classes.progressbox}>
                        <p> Progress to next miletone:</p>
                        <ProgressBar now="50" className ="progress"></ProgressBar>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Link className="take-survey-button" to={`/take-survey/${survey.name}`}>
                        <Box component="span" m={2} className={classes.smallbox}>
                            <Button className={classes.surveyButtons} variant="contained" color="primary">
                                Take Survey
                            </Button>
                        </Box>
                    </Link>
                </Grid>
                <Grid item xs={3}>
                <Link className="review-survey-button" to={`/review-survey/${survey.name}`}>
                    <Box component="span" m={2} className={classes.smallbox}>
                        <Button className={classes.surveyButtons} variant="contained" color="primary">
                            Review Survey
                        </Button>
                    </Box>
                </Link>
                </Grid>
            </Grid>
            {survey.description.map((paragraph, key) => (
                <p key={key} >{paragraph}</p>
            ))}
        </>
    );
}

export default DescriptionPage;