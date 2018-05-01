import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import LoginDialog from './login-dialog';

const mapStateToProps = (state) => ({
  userLoggedIn: state.user !== null,
});

const mapDispatchToProps = (dispatch) => ({
});


class LoginPage extends Component {
  render() {
    console.log(this.props)

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
  mapDispatchToProps,
)(LoginPage);

