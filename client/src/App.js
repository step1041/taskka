import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginPage from './auth/login.page'

import VerifyPage from './auth/verify.page';
import NewUserPage from './user/new-user.page';
import TaskListPage from './tasks/task-list.page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} component={LoginPage} />
            <Route path={'/auth/:provider/callback'} component={VerifyPage} />
            <Route path={'/user/new'} component={NewUserPage} />
            <Route path={'/tasks'} component={TaskListPage} />
            <Route><div>Default</div></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
