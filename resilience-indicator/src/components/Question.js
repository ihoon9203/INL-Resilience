import React from "react";
import QuestionList from "./QuestionList";

const Question = ({ question }) => (
    <>
        <li>
            {question.text}
            {question.sub_questions &&
                <QuestionList questions={question.sub_questions} />
            }
        </li>
    </>
);

export default Question;