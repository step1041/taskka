import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';

export const setTasks = (tasks) => ({
  type: "TASKS.SET",
  data: { tasks }
});

export const addTask = (task) => ((dispatch) => {
  return TaskkaApiClient
    .post('/tasks', { task })
    .then(({task: newTask}) => {
      dispatch({
        type: 'TASKS.ADD',
        data: { task: newTask }
      })
    })
    .catch(errorHandler);
});
