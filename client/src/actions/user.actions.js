import ACTION_TYPES from './action-types';

export const setUser = (user) => ({
  type: ACTION_TYPES.USER.SET,
  data: { user },
});

export const login = (user) => ({
  type: ACTION_TYPES.USER.LOGIN,
  data: { user }
});

export const logout = () => ({
  type: ACTION_TYPES.USER.LOGOUT,
});
