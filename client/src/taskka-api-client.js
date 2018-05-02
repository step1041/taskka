import Request from 'request-promise';

import config from './config';

const ACCESS_TOKEN_KEY = "taskka.access_token";

class TaskkaApiClient {
  static get(path) {
    return this.request({
      method: "GET",
      uri: config.serverUrl + path,
      json: true,
    })
  }

  static post(path, body) {
    return this.request({
      method: "POST",
      uri: config.serverUrl + path,
      body,
      json: true,
    })
  }

  static patch(path, body) {
    return this.request({
      method: "PATCH",
      uri: config.serverUrl + path,
      body,
      json: true,
    })
  }

  static request(options, withAuthHeader=true) {
    if (withAuthHeader && this.getAccessToken()) {
      if (!options.headers) {
        options.headers = {};
      }

      Object.assign(options.headers, {
        "Authorization": "Bearer " + this.getAccessToken(),
      });
    }

    return Request(options);
  }

  static getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}

export default TaskkaApiClient;
