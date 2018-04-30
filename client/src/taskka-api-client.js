import Request from 'request-promise';

import config from './config';

class TaskkaApiClient {
  static get(path) {
    return this.request({
      method: "GET",
      uri: config.serverUrl + path
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

  static request(options, withAuthHeader=true) {
    if (withAuthHeader) {
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
    return localStorage.getItem("taskka.access_token");
  }

  static setAccessToken(token) {
    localStorage.setItem("taskka.access_token", token);
  }

  static removeAccessToken() {
    localStorage.removeItem("taskka.access_token")
  }
}

export default TaskkaApiClient;
