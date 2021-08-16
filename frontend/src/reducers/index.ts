import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import projectsReducer, { initialState as projectsInitialState } from '../scenes/Projects/reducer';
import registrationReducer, { initialState as registrationInitialState } from '../scenes/SignupPage/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  projects: projectsInitialState,
  registration: registrationInitialState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  projects: projectsReducer,
  registration: registrationReducer
});

export { initialState, rootReducer };
