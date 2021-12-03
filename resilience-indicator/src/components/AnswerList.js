import React from "react";
import Answer from "./Answer";
import Question from "./Question";
import { Typography, Button, Box, List, ListItem } from '@material-ui/core';

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