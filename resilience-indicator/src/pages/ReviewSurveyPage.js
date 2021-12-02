import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import AnswerList from '../components/AnswerList';
import surveyDescriptions from '../resources/survey-descriptions';
import useStyles from '../styles';
import { Typography, Button, Divider, CssBaseline} from '@material-ui/core';


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
            <Divider/>
            
            <container>
                <AnswerList answers={surveyAnswers} />

                <box component="span" m={1} className={classes.spreadbox,classes.box}>
                    <Button className={classes.button} variant="contained" color="testsecondary" style={{marginLeft: 150}}>
                        <Link className="retake-survey-button" to={`/take-survey/${survey.name}`}>
                            Retake Survey
                        </Link>
                    </Button>

                    <Button className={classes.button} variant="contained" color="primary" style={{ marginLeft: 50}}> Update Survey </Button>
                </box>
            </container>
            

            
        </>
    );
}

export default ReviewSurveyPage;