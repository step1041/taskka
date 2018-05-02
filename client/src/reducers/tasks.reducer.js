const initState = [];

const tasksReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TASKS.SET':
      return action.data.tasks;
    default:
      return state;
  }
};

export default tasksReducer;
