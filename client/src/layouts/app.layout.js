import React, {Component} from 'react';
import {connect} from 'react-redux';

import {setUser} from '../actions/user.actions';

import errorHandler from '../lib/error-handler';
import TaskkaApiClient from '../lib/taskka-api-client';

import MainLayout from './main.layout';
import LoggedOutLayout from './logged-out.layout';

const mapStateToProps = (state) => ({
  user: state.user,
  accessToken: state.accessToken,
});

class AppLayout extends Component {
  componentDidMount() {
    if (!this.props.user && this.props.accessToken) {
      TaskkaApiClient
        .getCurrentUser()
        .then((user) => this.props.dispatch(setUser(user)))
        .catch(errorHandler);
    }
  }

  render() {
    if (this.props.user) {
      return <MainLayout/>
    }
    else if (this.props.accessToken) {
      return <div>Loading...</div>
    }
    else {
      return <LoggedOutLayout/>
    }
  }
}

export default connect(
  mapStateToProps,
)(AppLayout);

