import {List} from 'immutable';
import ACTION_TYPES from '../actions/action-types';

const initState = List();

const tasksReducer = (state = initState, action) => {
  let index;

  switch (action.type) {
    case ACTION_TYPES.USER.LOGOUT:
      return initState;

    case ACTION_TYPES.TASKS.SET:
      return List(action.data.TASKS);

    case ACTION_TYPES.TASKS.ADD:
      return state.push(action.data.task);

    case ACTION_TYPES.TASKS.UPDATE:
      index = state.findIndex((task) => task.id === action.data.task.id);
      return state.set(index, action.data.task);

    case ACTION_TYPES.TASKS.DELETE:
      index = state.findIndex((task) => task.id === action.data.task.id);
      return state.remove(index);

    default:
      return state;
  }
};

export default tasksReducer;
