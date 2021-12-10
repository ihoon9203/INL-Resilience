import React from "react";
import QuestionList from "./QuestionList";
import RadioButtonSet from "./RadioButtonSet";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Chip, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';

const sublistStyle = {
    color: 'blue',
    textIndent: '40px'
}

const Question = ({ question }) => (

    <Card className={useStyles().card}>
        <CardContent>
            <Grid container spacing={1} justify="left">
                <Grid item xs={.5}>{question.id}</Grid>
                <Grid item xs={10}>
                    <Typography>{question.text}</Typography>
                    <RadioButtonSet/>
                </Grid>
            </Grid>
            <li>
                {question.sub_questions &&
                    <QuestionList style={sublistStyle} questions={question.sub_questions} />
                }
            </li>
        </CardContent>
    </Card>
);

export default Question;