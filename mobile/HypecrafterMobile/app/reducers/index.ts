import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import mainPageReducer, { mainPageState } from '../components/MainView/reducer';
import userProfileReducer, { initialState as UserProfileState } from '../components/UserView/reducer';
import projectPageReducer, { projectPageState } from '../components/ProjectView/reducer';
import authReducer, { authState } from './auth';
import authenticationReducer, { authenticationState } from './login';

const initialState: StoreState = {
  auth: authState,
  authentication: authenticationState,
  mainPage: mainPageState,
  userPage: UserProfileState,
  projectPage: projectPageState,
};

const rootReducer = combineReducers({
  auth: authReducer,
  authentication: authenticationReducer,
  mainPage: mainPageReducer,
  userPage: userProfileReducer,
  projectPage: projectPageReducer
});

export { initialState, rootReducer };
