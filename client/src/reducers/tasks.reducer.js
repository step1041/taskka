import {List} from 'immutable';

const initState = List();

const tasksReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TASKS.SET':
      return List(action.data.tasks);
    default:
      return state;
  }
};

export default tasksReducer;
