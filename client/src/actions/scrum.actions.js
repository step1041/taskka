import TaskkaApiClient from '../lib/taskka-api-client';
import ACTION_TYPES from './action-types';

export const startScrum = (left_day, right_day) => ((dispatch) => {
  dispatch({
    type: ACTION_TYPES.SCRUM.START,
  });

  return Promise
    .all([
      left_day ? dispatch(setDay('left', left_day.format())) : Promise.resolve(),
      right_day ? dispatch(setDay('right', right_day.format())) : Promise.resolve(),
    ]);
});

export const setDay = (side, date) => ((dispatch) => {
  dispatch({
    type: ACTION_TYPES.SCRUM.SET_DAY + '.' + side.toUpperCase(),
    data: {date},
  });

  if (date === null) {
    return Promise.resolve();
  }

  return TaskkaApiClient.getScrumTasks(date)
    .then((tasks) => dispatch(setTasks(side, tasks)));
});

export const setTasks = (side, tasks) => ({
  type: ACTION_TYPES.SCRUM.SET_TASKS + '.' + side.toUpperCase(),
  data: {tasks},
});
