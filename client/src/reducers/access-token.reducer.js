import TaskkaApiClient from '../lib/taskka-api-client';

const initState = TaskkaApiClient.getAccessToken();

const accessTokenReducer = (state = initState, action) => {
  switch (action.type) {
    case 'USER.LOGIN':
      TaskkaApiClient.setAccessToken(action.data.user.access_token);
      return action.data.user.access_token;
    case 'ACCESS_TOKEN.SET':
      TaskkaApiClient.setAccessToken(action.data.accessToken);
      return action.data.accessToken;
    case 'USER.LOGOUT':
    case 'ACCESS_TOKEN.REMOVE':
      TaskkaApiClient.removeAccessToken();
      return null;
    default:
      return state;
  }
};

export default accessTokenReducer;
