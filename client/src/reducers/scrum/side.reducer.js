import {List, Map} from 'immutable';

import ACTION_TYPES from '../../actions/action-types';

const initState = Map({
  date: null,
  tasks: List(),
  tasks_pending: false,
});

const scrumSideReducer = (side) => {
  let sideSuffix = "." + side.toUpperCase();

  return (state = initState, action) => {
    switch (action.type) {
      case ACTION_TYPES.SCRUM.SET_DAY + sideSuffix:
        return state.merge({
          date: action.data.date,
          tasks: List(),
          tasks_pending: true,
        });

      case ACTION_TYPES.SCRUM.SET_TASKS + sideSuffix:
        return state.merge({
          tasks: List(action.data.tasks),
          tasks_pending: false,
        });

      default:
        return state;
    }
  }
};

export default scrumSideReducer;
