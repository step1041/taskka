import React, { Component } from "react";
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router'

import {setUser} from '../actions/user.actions';

import ConnectedSwitch from '../lib/connected-switch';
import errorHandler from '../lib/error-handler';

import UserInfo from '../components/user/user-info';

import LoginPage from '../pages/login.page';
import LogoutPage from '../pages/logout.page';
import VerifyPage from '../pages/verify.page';
import TasksPage from '../pages/tasks.page';
import NewUserPage from '../pages/new-user.page';
import TaskkaApiClient from '../lib/taskka-api-client';

const mapStateToProps = (state) => ({
  user: state.user,
  accessToken: state.accessToken,
});

class AppLayout extends Component {
  componentWillMount() {
    if (!this.props.user && this.props.accessToken) {
      TaskkaApiClient
        .get('/user')
        .then((response) => {
          this.props.dispatch(setUser(response.user));
        })
        .catch(errorHandler)
    }
  }

  render () {
    return (
      <div>
        AppLayout
        <UserInfo/>
        <ConnectedSwitch>
          <Route path={'/login'} component={LoginPage} />
          <Route path={'/logout'} component={LogoutPage} />
          <Route path={'/auth/:provider/callback'} component={VerifyPage} />
          <Route path={'/user/new'} component={NewUserPage} />
          <Route path={'/tasks'} component={TasksPage} />
          <Route>
            { this.props.accessToken ? <Redirect to={'/tasks'} /> : <Redirect to={'/login'} /> }
          </Route>
        </ConnectedSwitch>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
)(AppLayout);

