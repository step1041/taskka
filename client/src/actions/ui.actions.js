export const openProjectsPanel = () => ({
  type: 'UI.PROJECTS_PANEL.OPEN',
});

export const closeProjectsPanel = () => ({
  type: 'UI.PROJECTS_PANEL.CLOSE',
});

export const toggleProjectsPanel = () => ((dispatch, getState) => {
  let panelOpen = getState().ui.projectsPanelOpen;
  dispatch(panelOpen ? closeProjectsPanel() : openProjectsPanel());
});


export const setCurrentProject = (project) => ({
  type: 'PROJECTS.SET_CURRENT',
  data: {project},
});
