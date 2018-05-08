const initState = {
  projectsPanelOpen: false,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default uiReducer;
