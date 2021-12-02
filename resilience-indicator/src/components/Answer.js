import React from "react";
import AnswerList from "./AnswerList";
import { Typography, Grid, Box, Card, CardContent} from '@material-ui/core';


const Answer = ({ answer }) => (


    <Card>
        <CardContent> 

        <Grid container spacing={1} justify="left">
            <Grid item>
                {answer.id}
            </Grid>

            <Grid item>
                {answer.question}
            </Grid>

            <Grid item>
                <Box>
                    <Typography>
                         2/2 
                    </Typography>
                </Box>
            </Grid>
            
        </Grid>


            <li>
                {answer.answer}
                {answer.sub_answers &&
                     <AnswerList answers={answer.sub_answers} />
                }
            </li>

        </CardContent>
    </Card>
);

export default Answer;