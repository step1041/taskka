import ACTION_TYPES from './action-types';
import TaskkaApiClient from '../lib/taskka-api-client';
import {newWorkingDay, setUser} from './user.actions';
import moment from 'moment';

export const appStart = () => ((dispatch) => {
  dispatch({
    type: ACTION_TYPES.APP.APP_START,
  });

  return TaskkaApiClient
    .getCurrentUser()
    .then((user) => {
      let isNewDay = moment(user.current_working_day).isBefore(moment(), 'day');
      if (isNewDay) {
        return dispatch(newWorkingDay());
      }
      else {
        return dispatch(setUser(user));
      }
    });
});
