const initState = {
  projectsPanelOpen: false,
  currentProjectId: null,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER.LOGOUT":
      return initState;

    case "UI.PROJECTS_PANEL.OPEN":
      return {
        ...state,
        projectsPanelOpen: true,
      };
    case "UI.PROJECTS_PANEL.CLOSE":
      return {
        ...state,
        projectsPanelOpen: false,
      };


    case "USER.LOGIN":
    case "USER.SET":
      if (state.currentProjectId === null) {
        return {
          ...state,
          currentProjectId: action.data.user.default_project_id
        };
      }
      else {
        return state;
      }

    case "PROJECTS.SET_CURRENT":
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
