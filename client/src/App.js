import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './reducers';
import AppLayout from './layouts/app.layout';

import './App.css';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history))
  )
);

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
