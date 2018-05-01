import React, { Component } from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {setUser} from '../actions/user.actions';

import TaskkaApiClient from '../taskka-api-client';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  onLoginComplete: (user, isNewUser) => {
    dispatch(setUser(user));
    dispatch(push(isNewUser ? '/user/new' : '/tasks'));
  }
});


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
          ? <div>Summoning the bards</div>
          : <div>{this.state.error}</div>
        }
      </div>
    )
  }

  verifyLogin() {
    let provider = this.props.match.params.provider;

    let code = null;
    switch (provider) {
      case 'google':
        code = this.getGoogleAccessCode();
        break;
      default:
        let error = new Error("Unknown Provider");
        error.name = "OAuthError";
        throw error;
    }

    TaskkaApiClient
      .post('/auth/google/verify', {
        code,
        redirect_uri: window.location.origin + window.location.pathname,
      })
      .then((body) => {
        TaskkaApiClient.setAccessToken(body.access_token);
        this.props.onLoginComplete(body.user, body.new_user);
      });
  }

  getGoogleAccessCode() {
    let data = {};

    window.location.search
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

    return data.code;
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyPage);

