import TaskkaApiClient from '../lib/taskka-api-client';
import ACTION_TYPES from '../actions/action-types';

const initState = TaskkaApiClient.getAccessToken();

const accessTokenReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER.LOGIN:
      TaskkaApiClient.setAccessToken(action.data.user.access_token);
      return action.data.user.access_token;

    case ACTION_TYPES.ACCESS_TOKEN.SET:
      TaskkaApiClient.setAccessToken(action.data.accessToken);
      return action.data.ACCESS_TOKEN;

    case ACTION_TYPES.USER.LOGOUT:
    case ACTION_TYPES.ACCESS_TOKEN.REMOVE:
      TaskkaApiClient.removeAccessToken();
      return null;

    default:
      return state;
  }
};

export default accessTokenReducer;
