import React, { useState, useEffect } from 'react';
import {
  List, Grid, ListItemText, ListItem, ListItemIcon, Chip,
} from '@material-ui/core';
import '../App.css';
import Answer from './Answer';

const AnswerList = function AnswerListFunc({ answers }) {
  const [layoutStyle, setLayoutStyle] = useState('flex-container');
  useEffect(() => {
    if (window.innerWidth < 600) {
      setLayoutStyle('flex');
    }
  });
  return (
    <div>
      <Grid>
        <List class={layoutStyle}>
          <ListItem>
            <ListItemIcon>
              <Chip
                variant="outlined"
                size="big"
                style={{
                  backgroundColor: 'rgb(132, 132, 132, 0.26)',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Points not counted"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Chip
                variant="outlined"
                size="medium"
                style={{
                  backgroundColor: 'white',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Full points gained"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Chip
                variant="outlined"
                size="medium"
                style={{
                  backgroundColor: 'rgb(247, 68, 68, 0.30)',
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary="Full points missed"
            />
          </ListItem>
        </List>
      </Grid>
      <List>
        {answers.map((answer, key) => (
          <Answer key={key} answer={answer} />
        ))}
      </List>
    </div>
  );
};

export default AnswerList;
