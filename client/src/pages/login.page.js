import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginDialog from '../components/auth/login-dialog';

const mapStateToProps = (state) => ({
  userLoggedIn: state.accessToken !== null,
});

class LoginPage extends Component {
  render() {
    if (this.props.userLoggedIn) {
      return <Redirect to={'/'} />
    }

    return (
      <div>
        <LoginDialog/>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(LoginPage);

