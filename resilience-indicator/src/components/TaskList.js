/* eslint-disable no-return-assign */
import React from 'react';
import { List } from '@material-ui/core';
import Task from './Task';

const TaskList = function TaskListFunc({ tasks, priority, category }) {
  let taskCount = 0;

  return (
    <List>
      {tasks.map((task, key) => (
        task.priority === priority && (taskCount += 1) && (
          <Task key={key} taskPriority={task.priority} text={task.task} priority={priority} completed="false" category={category} />
        )
      ))}
      {taskCount < 1 && (
        <Task
          taskPriority={priority}
          text="Congratulations! All tasks in this priority level have been completed."
          priority={priority}
          completed="true"
          category={category}
        />
      )}
    </List>
  );
};

export default TaskList;
