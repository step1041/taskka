import ACTION_TYPES from './action-types';

export const openProjectsPanel = () => ({
  type: ACTION_TYPES.UI.PROJECTS_PANEL.OPEN,
});

export const closeProjectsPanel = () => ({
  type: ACTION_TYPES.UI.PROJECTS_PANEL.CLOSE,
});

export const toggleProjectsPanel = () => ((dispatch, getState) => {
  let panelOpen = getState().ui.projectsPanelOpen;
  dispatch(panelOpen ? closeProjectsPanel() : openProjectsPanel());
});
