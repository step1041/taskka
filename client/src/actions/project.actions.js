import TaskkaApiClient from '../lib/taskka-api-client';
import errorHandler from '../lib/error-handler';

const activeRequests = {};

export const getProjects = () => ((dispatch) => {
  if (!activeRequests.getProjects) {
    activeRequests.getProjects =
      TaskkaApiClient
        .getProjects()
        .then((projects) => {
          delete activeRequests.getProjects;
          return dispatch(setProjects(projects));
        })
        .catch(errorHandler);
  }

  return activeRequests.getProjects;
});

export const setProjects = (projects) => ({
  type: 'PROJECTS.SET',
  data: {projects},
});

export const addProject = (project) => ((dispatch) => {
  return TaskkaApiClient
    .addProject(project)
    .then((project) => {
      dispatch({
        type: 'PROJECTS.ADD',
        data: {project},
      });
    })
    .catch(errorHandler);
});

export const updateProject = (project) => ((dispatch) => {
  return TaskkaApiClient
    .updateProject(project)
    .then((project) => {
      dispatch({
        type: 'PROJECTS.UPDATE',
        data: {project},
      });
    })
    .catch(errorHandler);
});

export const deleteProject = (project) => ((dispatch) => {
  return TaskkaApiClient
    .deleteProject(project)
    .then((project) => {
      dispatch({
        type: 'PROJECTS.DELETE',
        data: {project},
      });
    })
    .catch(errorHandler);
});

export const setCurrentProject = (project) => ({
  type: 'PROJECTS.SET_CURRENT',
  data: {project},
});
