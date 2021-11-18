import React from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import SurveyList from '../components/SurveyList';
import surveyDescriptions from '../resources/survey-descriptions'

const SurveyPage = () => {
    const { name } = useParams();
    const survey = surveyDescriptions.find(
        survey => survey.name === name
    )

    if (!survey) return <NotFoundPage />

    const otherSurveys = surveyDescriptions.filter(
        survey => survey.name !== name
    )

    return (
        <>
            <h1>{survey.title}</h1>
            {survey.description.map((paragraph, key) => (
                <p key={key} >{paragraph}</p>
            ))}
            <button>
                <Link className="take-survey-button" to={`/take-survey/${survey.name}`}>
                    Take Survey
                </Link>
            </button>
            <h3>Other Surveys:</h3>
            <SurveyList surveys={otherSurveys} />
        </>
    );
}

export default SurveyPage;