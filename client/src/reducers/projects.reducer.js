import {List} from 'immutable';
import ACTION_TYPES from '../actions/action-types';

const initState = List();

const projectsReducer = (state = initState, action) => {
  let index;

  switch (action.type) {
    case ACTION_TYPES.USER.LOGOUT:
      return initState;

    case ACTION_TYPES.PROJECTS.SET:
      return List(action.data.projects);

    case ACTION_TYPES.PROJECTS.ADD:
      return state.push(action.data.project);

    case ACTION_TYPES.PROJECTS.UPDATE:
      index = state.findIndex((project) => project.id === action.data.project.id);
      return state.set(index, action.data.project);

    case ACTION_TYPES.PROJECTS.DELETE:
      index = state.findIndex((project) => project.id === action.data.project.id);
      return state.remove(index);

    default:
      return state;
  }
};

export default projectsReducer;
