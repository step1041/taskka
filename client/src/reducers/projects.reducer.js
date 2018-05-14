import {Map} from 'immutable';
import ACTION_TYPES from '../actions/action-types';

const initState = Map();

const projectsReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER.LOGOUT:
      return Map();

    case ACTION_TYPES.PROJECTS.SET:
      let projects = action.data.projects;
      projects = projects.map((project) => [project.id, project]);
      return Map(projects);

    case ACTION_TYPES.PROJECTS.ADD:
    case ACTION_TYPES.PROJECTS.UPDATE:
      return state.set(action.data.project.id, action.data.project);

    case ACTION_TYPES.PROJECTS.DELETE:
      return state.remove(action.data.project.id);

    default:
      return state;
  }
};

export default projectsReducer;
