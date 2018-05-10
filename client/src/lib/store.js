import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import createHistory from 'history/createBrowserHistory';

import reducers from '../reducers';

const history = createHistory();

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk),
    applyMiddleware(logger),
  )
);

export default store;
export { history };
