import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import AnswerList from '../components/AnswerList';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import { Button, Box, CssBaseline, Grid, Typography} from '@material-ui/core';


const ReviewSurveyPage = () => {
    const classes = useStyles();
    const { name } = useParams();
    const survey = surveyDescriptions.find(
        survey => survey.name === name
    )

    const [surveyAnswers, setSurveyAnswers] = useState([]);



    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `/api/survey-answers/${name}`
            );
            const body = await result.json();
            setSurveyAnswers(body);
        }
        fetchData().catch(err => console.log(err));
    }, [name])
    if (!survey || surveyAnswers.length === 0) return <NotFoundPage />

    

    return (
        <>
        <CssBaseline />

            <Typography variant="h4" align="center" color="primary" style={{width: '100%', height:'90%'}}>{survey.title} Review Survey</Typography>
            <Box className={classes.divider}></Box>
            
            <container>
                <AnswerList answers={surveyAnswers} />

                <Grid container justifyContent="center" alignItems="center">
                    
                    <Grid item xs={4} md={5}>
                        <Button className={classes.button} variant="contained" color="testsecondary" >Retake Survey</Button>
                    </Grid>

                    <Grid item xs={4} md={4}>
                        <Button className={classes.button} variant="contained" color="primary" > Update Survey </Button>
                    </Grid>

                </Grid>

            </container>
            

            
        </>
    );
}

export default ReviewSurveyPage;