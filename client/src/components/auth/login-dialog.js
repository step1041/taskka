import React, {Component} from 'react';

import config from 'taskka-config';

const GOOGLE_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

class LoginDialog extends Component {
  render() {
    return (
      <div>
        <a href={this.getGoogleAuthUrl()}>Log in with Google</a>
      </div>
    );
  }

  getGoogleAuthUrl() {
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

    return `${GOOGLE_ENDPOINT}?${query}`;
  }
}

export default LoginDialog;

