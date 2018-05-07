import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';

export const setTasks = (tasks) => ({
  type: 'TASKS.SET',
  data: {tasks},
});

export const addTask = (task) => ((dispatch) => {
  return TaskkaApiClient
    .addTask(task)
    .then((task) => {
      dispatch({
        type: 'TASKS.ADD',
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
        type: 'TASKS.UPDATE',
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
        type: 'TASKS.DELETE',
        data: {task},
      });
    })
    .catch(errorHandler);
});
