import React from 'react';
import PropTypes from 'prop-types';
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
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string).isRequired, // Do I have to do this for priority as well?
};

export default TaskList;
