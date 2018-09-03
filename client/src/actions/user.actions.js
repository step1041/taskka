import moment from 'moment';

import TaskkaApiClient from '../lib/taskka-api-client';

import ACTION_TYPES from './action-types';
import {setCurrentProject} from './project.actions';

export const setUser = (user) => ((dispatch) => {
  dispatch({
      type: ACTION_TYPES.USER.SET,
      data: { user },
  });

  if (moment(user.current_working_day).isBefore(moment(), 'day')) {
    dispatch(newWorkingDay(user));
  }

  return dispatch(setCurrentProject(user.default_project_id));
});

export const updateUser = (user) => ((dispatch) => {
  TaskkaApiClient
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

export const newWorkingDay = (user) => ((dispatch) => {
  return dispatch(updateUser({
    last_working_day: user.current_working_day,
    current_working_day: moment(),
  }));
});
