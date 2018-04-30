import React from 'react';

const GOOGLE_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";

function loginWithGoogle() {
  let url_data = {
    client_id: "615040531772-s8b0kpejme4jn9peopffji2757pm238e.apps.googleusercontent.com",
    redirect_uri: "http://localhost:2990/auth/google/callback",
    scope: "https://www.googleapis.com/auth/plus.me",
    response_type: "token",
  };

  let query =
    Object.entries(url_data)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

  window.location = `${GOOGLE_ENDPOINT}?${query}`;
}

const LoginDialog = () => (
  <div>
    <span onClick={loginWithGoogle}>Log in with Google</span>
  </div>
);

export default LoginDialog;

