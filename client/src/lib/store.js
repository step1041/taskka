import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

import reducers from '../reducers';

const history = createHistory();

const store = createStore(
  combineReducers(reducers),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(thunk),
  )
);

export default store;
export { history };
