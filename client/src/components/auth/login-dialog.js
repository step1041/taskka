import React, {Component} from 'react';

const GOOGLE_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';

class LoginDialog extends Component {
  constructor() {
    super();

    this.loginWithGoogle = this.loginWithGoogle.bind(this);
  }

  render() {
    return (
      <div>
        <span onClick={this.loginWithGoogle}>Log in with Google</span>
      </div>
    );
  }

  loginWithGoogle() {
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

    window.location = `${GOOGLE_ENDPOINT}?${query}`;
  }
}

export default LoginDialog;

