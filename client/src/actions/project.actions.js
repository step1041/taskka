import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';
import ACTION_TYPES from './action-types';
import {setTasks} from './task.actions';

const activeRequests = {};

export const fetchProjects = () => ((dispatch) => {
  if (!activeRequests.getProjects) {
    activeRequests.getProjects =
      TaskkaApiClient
        .fetchProjects()
        .then((projects) => {
          delete activeRequests.getProjects;
          return dispatch(setProjects(projects));
        })
        .catch(errorHandler);
  }

  return activeRequests.getProjects;
});

export const setProjects = (projects) => ({
  type: ACTION_TYPES.PROJECTS.SET,
  data: {projects},
});

export const addProject = (project) => ((dispatch) => {
  return TaskkaApiClient
    .addProject(project)
    .then((project) => {
      return dispatch({
        type: ACTION_TYPES.PROJECTS.ADD,
        data: {project},
      });
    })
    .catch(errorHandler);
});

export const updateProject = (project) => ((dispatch) => {
  return TaskkaApiClient
    .updateProject(project)
    .then((project) => {
      return dispatch({
        type: ACTION_TYPES.PROJECTS.UPDATE,
        data: {project},
      });
    })
    .catch(errorHandler);
});

export const deleteProject = (project) => ((dispatch, getState) => {
  return TaskkaApiClient
    .deleteProject(project)
    .then((project) => {
      dispatch({
        type: ACTION_TYPES.PROJECTS.DELETE,
        data: {project},
      });

      let state = getState();
      let defaultProject = state.user.default_project_id;
      return dispatch(setCurrentProject(defaultProject));
    })
    .catch(errorHandler);
});

export const setCurrentProject = (projectId) => ((dispatch) => {
  return TaskkaApiClient
    .getProject(projectId)
    .then((project) => {
      dispatch({
        type: ACTION_TYPES.PROJECTS.SET_CURRENT,
        data: {project},
      });
      dispatch(setTasks(project.tasks));
    });
});
