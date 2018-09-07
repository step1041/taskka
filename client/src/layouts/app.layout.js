import React, {Component} from 'react';
import {connect} from 'react-redux';

import {appStart} from '../actions/app.actions';

import MainLayout from './main.layout';
import LoggedOutLayout from './logged-out.layout';

const mapStateToProps = (state) => ({
  user: state.user,
  accessToken: state.accessToken,
});

class AppLayout extends Component {
  componentDidMount() {
    if (!this.props.user && this.props.accessToken) {
      this.props.dispatch(appStart());
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

