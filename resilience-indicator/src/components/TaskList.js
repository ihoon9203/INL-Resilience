/* eslint-disable no-return-assign */
import React from 'react';
import { List } from '@mui/material';
import Task from './Task';

const TaskList = function TaskListFunc({
  tasks, priority, category, enableGoal,
}) {
  let taskCount = 0;

  return (
    <List>
      {tasks.map((task, key) => (
        task.priority === priority && (taskCount += 1) && (
          <Task key={key} taskPriority={task.priority} text={task.task} priority={priority} completed={false} category={category} enableGoal={enableGoal} />
        )
      ))}
      {taskCount < 1 && (
        <Task
          taskPriority={priority}
          text="Congratulations! All tasks in this priority level have been completed."
          priority={priority}
          completed
          category={category}
          enableGoal={false}
        />
      )}
    </List>
  );
};

export default TaskList;
