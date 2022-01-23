import React from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardContent, Grid, Typography,
} from '@material-ui/core';
import QuestionList from './QuestionList';
import RadioButtonSet from './RadioButtonSet';

// Couldn't use the useStyles() method as before so I had to use this in file styling.
const cardStyle = {
  card: {
    margin: '30px 20px 20px 20px',
  },
};

class Question extends React.Component {
  constructor({ question }) {
    super(question); // super() must be called before using 'this.'
    this.question = question;
    this.state = {
      answerVal: '',
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  myChangeHandler(event) {
    this.setState({
      answerVal: event.target.value,
    });
  }

  render() {
    const { answerVal } = this.state;
    return (
      <Card style={cardStyle.card}>
        <CardContent>
          <Grid container spacing={1} justify="left">
            <Grid item xs={0.5}>
              {this.question.id}
            </Grid>
            <Grid item xs={10}>
              <Typography>{this.question.question || this.question.subquestion}</Typography>
              <RadioButtonSet
                myChangeHandler={this.myChangeHandler}
                answerVal={answerVal}
              />
            </Grid>
          </Grid>
          <li>
            {this.question.Subquestions && answerVal === 'Yes' && (
              <QuestionList questions={this.question.Subquestions} />
            )}
          </li>
        </CardContent>
      </Card>
    );
  }
}
Question.propTypes = {
  question: PropTypes.string.isRequired,
};

export default Question;
