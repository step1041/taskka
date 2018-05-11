import ACTION_TYPES from '../actions/action-types';

const initState = {
  projectsPanelOpen: false,
  currentProjectId: null,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_TYPES.USER.LOGOUT:
      return initState;

    case ACTION_TYPES.UI.PROJECTS_PANEL.OPEN:
      return {
        ...state,
        projectsPanelOpen: true,
      };
    case ACTION_TYPES.UI.PROJECTS_PANEL.CLOSE:
      return {
        ...state,
        projectsPanelOpen: false,
      };

    case ACTION_TYPES.USER.SET:
    case ACTION_TYPES.USER.LOGIN:
      if (state.currentProjectId === null) {
        return {
          ...state,
          currentProjectId: action.data.user.default_project_id
        };
      }
      else {
        return state;
      }

    case ACTION_TYPES.PROJECTS.SET_CURRENT:
      return {
        ...state,
        currentProjectId: action.data.project.id,
        projectsPanelOpen: false,
      };

    default:
      return state;
  }
};

export default uiReducer;
