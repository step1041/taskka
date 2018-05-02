import {push} from 'react-router-redux';
import {removeAccessToken} from '../actions/accessToken.actions';

import store from './store';

function errorHandler(error) {
  if (error.name === "TaskkaApiError" && error.message === "Not Authorized") {
    store.dispatch(removeAccessToken());
    store.dispatch(push('/login'));
    return;
  }

  throw error;
}

export default errorHandler;
