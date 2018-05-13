import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';
import ACTION_TYPES from './action-types';

export const setTasks = (tasks) => ({
  type: ACTION_TYPES.TASKS.SET,
  data: {tasks},
});

export const addTask = (projectId, task) => ((dispatch) => {
  return TaskkaApiClient
    .addTask(projectId, task)
    .then((task) => {
      dispatch({
        type: ACTION_TYPES.TASKS.ADD,
        data: {task},
      });
    })
    .catch(errorHandler);
});

export const updateTask = (task) => ((dispatch) => {
  return TaskkaApiClient
    .updateTask(task)
    .then((task) => {
      dispatch({
        type: ACTION_TYPES.TASKS.UPDATE,
        data: {task},
      });
    })
    .catch(errorHandler);
});

export const deleteTask = (task) => ((dispatch) => {
  return TaskkaApiClient
    .deleteTask(task)
    .then((task) => {
      dispatch({
        type: ACTION_TYPES.TASKS.DELETE,
        data: {task},
      });
    })
    .catch(errorHandler);
});
