import React, { Component } from 'react';

import TaskkaApiClient from '../taskka-api-client';

class VerifyPage extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.verifyLogin();
  }

  render() {
    return (
      <div>
        {
          !this.state.error
          ? <div>Finding new secrets...</div>
          : <div>{this.state.error}</div>
        }
      </div>
    )
  }

  verifyLogin() {
    let provider = this.props.match.params.provider;

    let access_token = null;
    switch (provider) {
      case 'google':
        access_token = this.getGoogleAccessToken();
        break;
      default:
        let error = new Error("Unknown Provider");
        error.name = "OAuthError";
        throw error;
    }

    TaskkaApiClient
      .post('/auth/google/verify', { access_token })
      .then((body) => {
        TaskkaApiClient.setAccessToken(body.access_token);
      });
  }

  getGoogleAccessToken() {
    let data = {};

    window.location.hash
      .substr(1)
      .split('&')
      .forEach((pair) => {
        let [key, value] = pair.split('=');
        data[key] = value;
      });

    if (data.error) {
      let error = new Error(data.error);
      error.name = "OAuthError";
      throw error;
    }

    return data.access_token;
  }
};

export default VerifyPage;

