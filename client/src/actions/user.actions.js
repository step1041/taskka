import moment from 'moment';

import TaskkaApiClient from '../lib/taskka-api-client';

import ACTION_TYPES from './action-types';
import {setCurrentProject} from './project.actions';
import {updateTask} from './task.actions';

export const setUser = (user) => ((dispatch) => {
  dispatch({
      type: ACTION_TYPES.USER.SET,
      data: { user },
  });


  return dispatch(setCurrentProject(user.default_project_id))
    .then(() => {
      if (moment(user.current_working_day).isBefore(moment(), 'day')) {
        return dispatch(newWorkingDay(user));
      }
    });
});

export const updateUser = (user) => ((dispatch) => {
  return TaskkaApiClient
    .updateCurrentUser(user)
    .then((savedUser) => {
      dispatch({
        type: ACTION_TYPES.USER.SET,
        data: {user: savedUser},
      });
    });
});

export const login = (user) => ((dispatch) => {
  dispatch({
    type: ACTION_TYPES.USER.LOGIN,
    data: { user }
  });

  return dispatch(setCurrentProject(user.default_project_id));
});

export const logout = () => ({
  type: ACTION_TYPES.USER.LOGOUT,
});

export const newWorkingDay = (user) => ((dispatch, getState) => {
  dispatch({
    type: ACTION_TYPES.USER.NEW_WORKING_DAY,
  });

  let inProgressTasks = getState().tasks.filter((t) => t.state === "in_progress");
  let taskUpdates = inProgressTasks.map((task) => {
    return dispatch(updateTask({
      id: task.id,
      state: 'new',
    }));
  });

  return Promise.all([
    ...taskUpdates,
    dispatch(updateUser({
      last_working_day: user.current_working_day,
      current_working_day: moment(),
    }))
  ]);
});
