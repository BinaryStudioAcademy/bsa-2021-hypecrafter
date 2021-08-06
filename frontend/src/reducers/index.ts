import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import usersReducer, { initialState as usersInitialState } from '../scenes/Users/reducer';
import authReducer, { authState } from './auth';
import projectsReducer, { projectState } from './projects';

const initialState: StoreState = {
  projects: projectState,
  users: usersInitialState,
  auth: authState
};

const rootReducer = combineReducers({
  projects: projectsReducer,
  users: usersReducer,
  auth: authReducer
});

export { initialState, rootReducer };
