import React from "react";
import QuestionList from "./QuestionList";
import RadioButtonSet from "./RadioButtonSet";
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';

// Couldn't use the useStyles() method as before so I had to use this in file styling.
const cardStyle = {
    card: {
        margin: '30px 20px 20px 20px',
    }
}

class Question extends React.Component {

    constructor(props) {
        super(props); // super() must be called before using 'this.'
        this.question = this.props.question
        this.state = {
            answerVal: '',
        };
        this.myChangeHandler = this.myChangeHandler.bind(this);
    }
    myChangeHandler(event) {
        this.setState({
            ["answerVal"]: event.target.value
        });

    }
    render() {
        return (
            <Card style={cardStyle.card}>
                <CardContent>
                    <Grid container spacing={1} justify="left">
                        <Grid item xs={.5}>{this.question.id}</Grid>
                        <Grid item xs={10}>
                            <Typography>{this.question.text}</Typography>
                            <RadioButtonSet myChangeHandler={this.myChangeHandler}
                                answerVal={this.state.answerVal} />
                        </Grid>
                    </Grid>
                    <li>
                        {this.question.subquestions && this.state.answerVal == "Yes" &&
                            <QuestionList questions={this.question.subquestions} />
                        }
                    </li>
                </CardContent>
            </Card>
        )
    }
}

export default Question;