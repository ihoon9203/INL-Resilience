import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import QuestionList from '../components/QuestionList';
import surveyDescriptions from '../resources/survey-descriptions'

const TakeSurveyPage = () => {
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
            <h1>{survey.title} Survey</h1>
            <QuestionList questions={surveyQuestions} />
        </>
    );
}

export default TakeSurveyPage;