import TaskkaApiClient from '../lib/taskka-api-client';
import ACTION_TYPES from './action-types';

export const startScrum = (left_day, right_day) => ((dispatch) => {
  dispatch({
    type: ACTION_TYPES.SCRUM.START,
  });

  left_day = left_day.format();
  right_day = right_day.format();

  return Promise
    .all([
      dispatch(setDay('left', left_day)),
      dispatch(setDay('right', right_day)),
    ]);
});

export const setDay = (side, date) => ((dispatch) => {
  dispatch({
    type: ACTION_TYPES.SCRUM.SET_DAY + '.' + side.toUpperCase(),
    data: {date},
  });

  return TaskkaApiClient.getScrumTasks(date)
    .then((tasks) => dispatch(setTasks(side, tasks)));
});

export const setTasks = (side, tasks) => ({
  type: ACTION_TYPES.SCRUM.SET_TASKS + '.' + side.toUpperCase(),
  data: {tasks},
});
