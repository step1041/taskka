import {List} from 'immutable';

const initState = List();

const tasksReducer = (state = initState, action) => {
  let index;

  switch (action.type) {
    case 'TASKS.SET':
      return List(action.data.tasks);
    case 'TASKS.ADD':
      return state.push(action.data.task);
    case 'TASKS.UPDATE':
      index = state.findIndex((task) => task.id === action.data.task.id);
      return state.set(index, action.data.task);
    case 'TASKS.DELETE':
      index = state.findIndex((task) => task.id === action.data.task.id);
      return state.remove(index);
    default:
      return state;
  }
};

export default tasksReducer;
