import React from 'react';
import { List } from '@material-ui/core';
import Task from './Task';

const TaskList = function TaskListFunc({ tasks, priority }) {
  return (
    <List>
      {tasks.map((task, key) => (
        <Task key={key} task={task} priority={priority} />
      ))}
    </List>
  );
};

export default TaskList;
