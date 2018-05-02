import {routerReducer} from 'react-router-redux';
import userReducer from './user.reducer';
import accessTokenReducer from './access-token.reducer';

const reducers = {
  accessToken: accessTokenReducer,
  router: routerReducer,
  user: userReducer,
};

export default reducers;
