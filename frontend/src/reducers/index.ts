import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import usersReducer, { initialState as usersInitialState } from '../scenes/Users/reducer';
import authReducer, { authState } from './auth';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';

const initialState: StoreState = {
  users: usersInitialState,
  auth: authState,
  project: projectInitialState
};

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  project: projectReduser
});

export { initialState, rootReducer };
