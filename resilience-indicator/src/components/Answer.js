import React from "react";
import useStyles from '../styles';
import AnswerList from "./AnswerList";
import {Card, CardContent, Chip, Grid, Typography} from '@material-ui/core';




const Answer = ({ answer }) => (


    <Card className={useStyles().card}>
        <CardContent>

            <Grid container spacing={1} justify="left">

                <Grid item xs={.5}>{answer.id}</Grid>

                <Grid item xs={10}>
                    <Typography>{answer.question}</Typography>
                </Grid>

                <Grid item xs={1}>
                    <Chip label={answer.score} variant="outlined" color="error" size="small"/>
                </Grid>

            </Grid>


            <li>
                <Typography className={useStyles().answer}>{answer.answer}</Typography>
                {answer.sub_answers &&
                    <AnswerList answers={answer.sub_answers} />}
            </li>

        </CardContent>
    </Card>
);

export default Answer;