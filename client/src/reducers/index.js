import {routerReducer} from 'react-router-redux';
import userReducer from './user.reducer';
import accessTokenReducer from './access-token.reducer';
import tasksReducer from './tasks.reducer';
import uiReducer from './ui.reducer';
import projectsReducer from './projects.reducer';
import scrumReducer from './scrum.reducer';

const reducers = {
  accessToken: accessTokenReducer,
  router: routerReducer,
  ui: uiReducer,
  user: userReducer,
  tasks: tasksReducer,
  projects: projectsReducer,
  scrum: scrumReducer,
};

export default reducers;
