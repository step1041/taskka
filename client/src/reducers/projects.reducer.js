import {List} from 'immutable';

const initialState = List();

const projectsReducer = (state = initialState, action) => {
  let index;

  switch (action.type) {
    case "USER.LOGOUT":
      return initialState;

    case 'PROJECTS.SET':
      return List(action.data.projects);
    case 'PROJECTS.ADD':
      return state.push(action.data.project);
    case 'PROJECTS.UPDATE':
      index = state.findIndex((project) => project.id === action.data.project.id);
      return state.set(index, action.data.project);
    case 'PROJECTS.DELETE':
      index = state.findIndex((project) => project.id === action.data.project.id);
      return state.remove(index);

    default:
      return state;
  }
};

export default projectsReducer;
