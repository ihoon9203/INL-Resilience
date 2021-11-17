import React from 'react';
import SurveyList from '../components/SurveyList';
import surveyDescriptions from '../resources/survey-descriptions';

const SurveyListPage = () => (
    <>
        <h1>Surveys</h1>
        <SurveyList surveys={surveyDescriptions} />
    </>
);

export default SurveyListPage;