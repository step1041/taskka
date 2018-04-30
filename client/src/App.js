import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import LoginDialog from './auth/login-dialog';

import {BrowserRouter, Route, Switch} from 'react-router-dom'
import VerifyPage from './auth/verify.page';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
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
