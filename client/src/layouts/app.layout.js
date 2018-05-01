import React from "react";

import {Route, Switch} from 'react-router-dom';

import VerifyPage from '../auth/verify.page';
import LoginPage from '../auth/login.page';
import TaskListPage from '../tasks/task-list.page';
import NewUserPage from '../user/new-user.page';

const AppLayout = () => (
  <div>
    <Switch>
      <Route exact path={'/'} component={LoginPage} />
      <Route path={'/auth/:provider/callback'} component={VerifyPage} />
      <Route path={'/user/new'} component={NewUserPage} />
      <Route path={'/tasks'} component={TaskListPage} />
      <Route>
        <div>Default</div>
      </Route>
    </Switch>
  </div>
);

export default AppLayout;

