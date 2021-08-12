import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import usersReducer, { initialState as usersInitialState } from '../scenes/Users/reducer';
import authReducer, { authState } from './auth';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import registrationReducer, { initialState as registrationInitialState } from '../scenes/SignupPage/reducer';

const initialState: StoreState = {
  users: usersInitialState,
  auth: authState,
  project: projectInitialState,
  registration: registrationInitialState
};

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  project: projectReduser,
  registration: registrationReducer
});

export { initialState, rootReducer };
