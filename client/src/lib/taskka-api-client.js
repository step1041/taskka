import Request from 'request-promise';

import config from '../config';

const ACCESS_TOKEN_KEY = 'taskka.access_token';

class TaskkaApiClient {
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
