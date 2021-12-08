import React from "react";
import Answer from "./Answer";
import Question from "./Question";
import { List } from '@material-ui/core';

const AnswerList = ({ answers }) => (
    <>
        <List >
            {answers.map((answer, key) => (
                <Answer key={key} answer={answer} />
            ))}
        </List>
    </>
);

export default AnswerList;