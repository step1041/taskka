import ACTION_TYPES from './action-types';
import {setCurrentProject} from './project.actions';

export const setUser = (user) => ((dispatch) => {
  dispatch({
      type: ACTION_TYPES.USER.SET,
      data: { user },
  });

  return dispatch(setCurrentProject(user.default_project_id));
});

export const login = (user) => ((dispatch) => {
  dispatch({
    type: ACTION_TYPES.USER.LOGIN,
    data: { user }
  });

  return dispatch(setCurrentProject(user.default_project_id));
});

export const logout = () => ({
  type: ACTION_TYPES.USER.LOGOUT,
});
