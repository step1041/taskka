import TaskkaApiClient from '../lib/taskka-api-client';

import ACTION_TYPES from './action-types';

export const setUser = (user) => ({
  type: ACTION_TYPES.USER.SET,
  data: {user},
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
    data: {user},
  });

  dispatch(setUser(user));
});

export const logout = () => ({
  type: ACTION_TYPES.USER.LOGOUT,
});

export const newWorkingDay = () => ((dispatch) => {
  return TaskkaApiClient
    .newWorkingDay()
    .then((user) => dispatch(setUser(user)));
});
