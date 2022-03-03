import React from 'react';
import {
  Card, CardContent, Grid, Typography,
} from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import QuestionList from './QuestionList';
import RadioButtonSet from './RadioButtonSet';

// Couldn't use the useStyles() method as before so I had to use this in file styling.
const cardStyle = {
  card: {
    margin: '30px 20px 20px 20px',
  },
};

class Question extends React.Component {
  constructor(props) {
    super(props); // super() must be called before using 'this.'
    this.question = props.question;
    this.state = {
      answerVal: '',
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  myChangeHandler(event) {
    this.setState({
      answerVal: event.target.value,
    });
    this.question.answer = event.target.value;
  }

  render() {
    const { answerVal } = this.state;
    return (
      <Card style={cardStyle.card}>
        <CardContent>
          <Grid container spacing={1} justifyContent="flex-start">
            <Grid item xs={10}>
              <Typography>{this.question.question || this.question.subquestion}</Typography>
              <RadioButtonSet
                myChangeHandler={this.myChangeHandler}
                answerVal={answerVal}
              />
            </Grid>
            <Grid item xs={1}>
              {this.question.Subquestions && answerVal === 'Yes' && (
                <Tooltip title={this.question.question}>
                  <IconButton>
                    <InfoOutlinedIcon fontsize="small" color="primary" />
                  </IconButton>
                </Tooltip>
              )}
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

export default Question;
