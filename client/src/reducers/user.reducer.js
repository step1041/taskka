import ACTION_TYPES from '../actions/action-types';

const initState = null;

const userReducer = (state = initState, action) => {
  switch(action.type) {
    case ACTION_TYPES.USER.LOGOUT:
      return initState;

    case ACTION_TYPES.USER.SET:
      return action.data.user;

    default:
      return state;
  }
};

export default userReducer;
