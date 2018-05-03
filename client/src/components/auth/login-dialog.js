import React, {Component} from 'react';

const GOOGLE_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

class LoginDialog extends Component {
  constructor() {
    super();
  }

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
      redirect_uri: 'http://localhost:2990/auth/google/callback',
      response_type: 'code',
      client_id: '615040531772-s8b0kpejme4jn9peopffji2757pm238e.apps.googleusercontent.com',
    };

    let query =
      Object.entries(url_data)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');

    return `${GOOGLE_ENDPOINT}?${query}`;
  }
}

export default LoginDialog;

