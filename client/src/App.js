import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux';

import AppLayout from './layouts/app.layout';

import './App.css';

import store, {history} from './lib/store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppLayout/>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
