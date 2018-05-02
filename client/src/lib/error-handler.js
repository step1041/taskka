import {push} from 'react-router-redux';

import store from './store';

function errorHandler(error) {
  if (error.name === "TaskkaApiError" && error.message === "Not Authorized") {
    store.dispatch(push('/login'));
    return;
  }

  throw error;
}

export default errorHandler;
