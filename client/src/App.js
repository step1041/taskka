import React, { Component } from 'react';
import './App.css';

import LoginDialog from './auth/login-dialog';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import VerifyPage from './auth/verify.page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} component={LoginDialog}/>
            <Route path={'/auth/:provider/callback'} component={VerifyPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
