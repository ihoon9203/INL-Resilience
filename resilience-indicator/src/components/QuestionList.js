import React from "react";
import Question from "./Question";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import RadioButtonSet from "./RadioButtonSet";
//import { makeStyles } from "@material-ui/core/styles";

const sublistStyle = {
    
    color: 'blue',
    fontSize: '72px'
}


const QuestionList = ({ questions }) => (
        <List>
            {questions.map((question, key) => (
                <Question key={key} question={question} />
            ) )}
        </List>
);

export default QuestionList;