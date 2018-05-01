const initState = null;

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
