import React from "react";
import Question from "./Question";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ButtonSet from "./ButtonSet";
//import { makeStyles } from "@material-ui/core/styles";

const sublistStyle = {
    
    color: 'blue',
    fontSize: '72px'
}


const QuestionList = ({ questions }) => (

    <Box sx={{ width: '100%', maxWidth: 1060}}>
        <List>
            {questions.map((question, key) => (
                <Question  key={key} question={question} />
                
            ) )}

            
            {/* <Question key={key} question={question} /> */}
            <Divider />
            
        </List>
    </Box>

);

export default QuestionList;