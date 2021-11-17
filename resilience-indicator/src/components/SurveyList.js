import React from "react";
import { Link } from "react-router-dom";
import SurveyPage from "../pages/SurveyPage";

const SurveyList = ({ surveys }) => (
    <>
        {surveys.map((survey, key) => (
            <Link className="survey-list-item" key={key} to={`/survey/${survey.name}`}>
                <h3>{survey.title}</h3>
                <p>{survey.description[0].substring(0, 120)}...</p>
            </Link>
        ))}
    </>
);

export default SurveyList;