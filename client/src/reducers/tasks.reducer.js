import {List} from 'immutable';

const initState = List();

const tasksReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TASKS.ADD':
      return state.push(action.data.task);
    case 'TASKS.SET':
      return List(action.data.tasks);
    case 'TASKS.UPDATE':
      let newTask = action.data.task;
      let index = state.findIndex((task) => task.id === newTask.id);
      return state.set(index, newTask);
    default:
      return state;
  }
};

export default tasksReducer;
