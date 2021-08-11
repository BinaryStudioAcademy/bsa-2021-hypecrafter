import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import usersReducer, { initialState as usersInitialState } from '../scenes/Users/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';

const initialState: StoreState = {
  users: usersInitialState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState
};

const rootReducer = combineReducers({
  users: usersReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser
});

export { initialState, rootReducer };
