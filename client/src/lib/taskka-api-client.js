import Request from 'request-promise';

import config from 'taskka-config';

const ACCESS_TOKEN_KEY = 'taskka.access_token';

class TaskkaApiClient {
  static verifyOAuthCode(provider, code, redirect_uri) {
    return this.post(`/auth/${provider}/verify`, {
      code,
      redirect_uri,
    });
  }

  static getCurrentUser() {
    return this.get('/user')
      .then(({user}) => user);
  }

  static updateCurrentUser(user) {
    return this.patch('/user', {user})
      .then(({user}) => user);
  }

  static getProjects() {
    return this.get('/projects')
      .then(({projects}) => projects);
  }

  static addProject(project) {
    return this.post('/projects', {project})
      .then(({project}) => project);
  }

  static updateProject(project) {
    return this.patch(`projects/${project.id}`, {project})
      .then(({project}) => project);
  }

  static deleteProject(project) {
    return this.delete(`projects/${project.id}`)
      .then(({project}) => project);
  }

  static getTasks() {
    return this.get('/tasks')
      .then(({tasks}) => tasks);
  }

  static addTask(task) {
    return this.post('/tasks', {task})
      .then(({task}) => task);
  }

  static updateTask(task) {
    return this.patch(`/tasks/${task.id}`, {task})
      .then(({task}) => task);
  }

  static deleteTask(task) {
    return this.delete(`/tasks/${task.id}`)
      .then(({task}) => task);
  }

  /* ==== basic requests stuff ==== */

  static get(path) {
    return this.request({
      method: 'GET',
      uri: config.serverUrl + path,
      json: true,
    });
  }

  static post(path, body) {
    return this.request({
      method: 'POST',
      uri: config.serverUrl + path,
      body,
      json: true,
    });
  }

  static patch(path, body) {
    return this.request({
      method: 'PATCH',
      uri: config.serverUrl + path,
      body,
      json: true,
    });
  }

  static delete(path) {
    return this.request({
      method: 'DELETE',
      uri: config.serverUrl + path,
      json: true,
    });
  }

  static request(options) {
    if (!options.headers) {
      options.headers = {};
    }

    Object.assign(options.headers, {
      'Authorization': 'Bearer ' + this.getAccessToken(),
    });

    return Request(options)
      .catch((error) => {
        if (error.statusCode === 401) {
          this.removeAccessToken();

          let newError = new Error('Not Authorized');
          newError.name = 'TaskkaApiError';
          throw newError;
        }

        throw error;
      });
  }

  /* ==== Access Token stuff ==== */

  static getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}

export default TaskkaApiClient;
