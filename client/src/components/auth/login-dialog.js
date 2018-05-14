import React, {Component} from 'react';

import config from 'taskka-config';

import "./login-dialog.scss";

const GOOGLE_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

class LoginDialog extends Component {
  constructor() {
    super();

    this.googleLogin = this.googleLogin.bind();
  }

  render() {
    return (
      <div className={"login-dialog"}>
        Sign in with
        <div className={"btn google-btn"} onClick={this.googleLogin}>Google</div>
      </div>
    );
  }

  googleLogin() {
    let url_data = {
      scope: 'https://www.googleapis.com/auth/plus.me',
      redirect_uri: `${config.clientUrl}/auth/google/callback`,
      response_type: 'code',
      client_id: config.google.clientId,
    };

    let query =
      Object.entries(url_data)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    window.location = `${GOOGLE_ENDPOINT}?${query}`;
  }
}

export default LoginDialog;

