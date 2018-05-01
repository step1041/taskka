import {routerReducer} from 'react-router-redux';
import userReducer from './user.reducer';

const reducers = {
  router: routerReducer,
  user: userReducer,
};

export default reducers;
