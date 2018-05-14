import ACTION_TYPES from './action-types';

export const setAccessToken = (accessToken) => ({
  type: ACTION_TYPES.ACCESS_TOKEN.SET,
  data: { accessToken },
});

export const removeAccessToken = () => ({
  type: ACTION_TYPES.ACCESS_TOKEN.REMOVE,
});
