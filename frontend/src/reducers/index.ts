import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import projectsReducer, { initialState as projectsInitialState } from '../scenes/Projects/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  projects: projectsInitialState
};

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  projects: projectsReducer
});

export { initialState, rootReducer };
