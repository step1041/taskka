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

export const updateTask = (task) => ((dispatch) => {
  return TaskkaApiClient
    .patch(`/tasks/${task.id}`, { task })
    .then(({task: newTask}) => {
      dispatch({
        type: 'TASKS.UPDATE',
        data: { task: newTask }
      })
    })
    .catch(errorHandler);
});

export const deleteTask = (task) => ((dispatch) => {
  return TaskkaApiClient
    .delete(`/tasks/${task.id}`)
    .then(({task: deletedTask}) => {
      dispatch({
        type: 'TASKS.DELETE',
        data: {task: deletedTask},
      });
    })
    .catch(errorHandler);
});
