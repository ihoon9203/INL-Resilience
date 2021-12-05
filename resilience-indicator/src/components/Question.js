import React from "react";
import QuestionList from "./QuestionList";
import ButtonSet from "./ButtonSet";
import { makeStyles } from "@material-ui/core/styles";

const sublistStyle = {
    color: 'blue',
    textIndent: '40px'
}

const Question = ({ question }) => (
    <>
        <li>
            {question.text}
            <ButtonSet></ButtonSet>
            <li style={sublistStyle}>
            {question.subquestions &&
                <QuestionList style={sublistStyle} questions={question.subquestions} />
            }
            </li>
        </li>
    </>
);

export default Question;