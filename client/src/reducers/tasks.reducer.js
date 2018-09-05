import {Map} from 'immutable';
import ACTION_TYPES from '../actions/action-types';

const initState = Map();

const tasksReducer = (state = initState, action) => {
  let tasks;
  let task;

  switch (action.type) {
    case ACTION_TYPES.USER.LOGOUT:
      return initState;

    case ACTION_TYPES.PROJECTS.SET_CURRENT:
      action.data.tasks = action.data.project.tasks;
      // eslint-disable-next-line no-fallthrough
    case ACTION_TYPES.TASKS.SET:
      tasks = action.data.tasks.map((task) => [task.id, task]);
      return Map(tasks);

    case ACTION_TYPES.TASKS.ADD:
      task = action.data.task;
      return state.set(task.id, task);

    case ACTION_TYPES.TASKS.UPDATE_PENDING:
      task = state.get(action.data.task.id);
      return state.set(task.id, {
        ...task,
        ...action.data.task,
      });

    case ACTION_TYPES.TASKS.UPDATE:
      task = action.data.task;
      return state.set(task.id, task);

    case ACTION_TYPES.TASKS.DELETE:
      return state.remove(action.data.task.id);

    default:
      return state;
  }
};

export default tasksReducer;
