import React, { useState, useEffect } from 'react';
import {Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import QuestionList from '../components/QuestionList';
import surveyDescriptions from '../resources/survey-descriptions'
import useStyles from '../styles';
import { Button, Box, CssBaseline, Grid, Typography } from '@material-ui/core';


const TakeSurveyPage = () => {
    const classes = useStyles();
    const { name } = useParams();
    const survey = surveyDescriptions.find(
        survey => survey.name === name
    )

    const [surveyQuestions, setSurveyQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(
                `/api/survey-questions/${name}`
            );
            const body = await result.json();
            setSurveyQuestions(body);
        }
        fetchData().catch(err => console.log(err));
    }, [name])

    if (!survey || surveyQuestions.length === 0) return <NotFoundPage />

    return (
        <>
            <CssBaseline />

            <Typography variant="h4" align="center" color="primary" style={{ width: '100%', height: '90%' }}>{survey.title} Survey</Typography>
            <Box className={classes.divider}></Box>
            <container>
                <QuestionList questions={surveyQuestions} />
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item>

                        <Link className="take-survey-button" to={`/review-survey/${survey.name}`}>
                            <Button className={classes.button} variant="contained" color="primary " >Submit Survey</Button>
                        </Link>
                    </Grid>
                </Grid>
            </container>
        </>
    );
}

export default TakeSurveyPage;