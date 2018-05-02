import {routerReducer} from 'react-router-redux';
import userReducer from './user.reducer';
import accessTokenReducer from './access-token.reducer';
import tasksReducer from './tasks.reducer';

const reducers = {
  accessToken: accessTokenReducer,
  router: routerReducer,
  user: userReducer,
  tasks: tasksReducer,
};

export default reducers;
