  import React from "react";
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router'

import ConnectedSwitch from '../lib/connected-switch';

import VerifyPage from '../auth/verify.page';
import LoginPage from '../auth/login.page';
import TaskListPage from '../tasks/task-list.page';
import NewUserPage from '../user/new-user.page';

const mapStateToProps = (state) => ({
  userLoggedIn: state.user !== null,
});

const mapDispatchToProps = (dispatch) => ({
});

const AppLayout = ({userLoggedIn}) => (
  <div>
    AppLayout
    <ConnectedSwitch>
      <Route path={'/login'} component={LoginPage} />
      <Route path={'/auth/:provider/callback'} component={VerifyPage} />
      <Route path={'/user/new'} component={NewUserPage} />
      <Route path={'/tasks'} component={TaskListPage} />
      <Route>
        { userLoggedIn ? <Redirect to={'/tasks'} /> : <Redirect to={'/login'} /> }
      </Route>
    </ConnectedSwitch>
  </div>

);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppLayout);

