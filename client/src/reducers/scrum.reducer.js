import {combineReducers} from 'redux';

import scrumSideReducer from './scrum/side.reducer';

const scrumReducer = combineReducers({
  left: scrumSideReducer('left'),
  right: scrumSideReducer('right'),
});

export default scrumReducer;

