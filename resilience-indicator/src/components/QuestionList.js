import React from "react";
import Question from "./Question";

const QuestionList = ({ questions }) => (
    <>
        <ul>
            {questions.map((question, key) => (
               <Question key={key} question={question} /> 
            ))}
        </ul>
    </>
);

export default QuestionList;