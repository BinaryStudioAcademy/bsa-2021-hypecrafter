import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authenticationReducer, { initialState as authenticationInitialState } from '../scenes/Auth/reducer';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  authentication: authenticationInitialState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  authentication: authenticationReducer
});

export { initialState, rootReducer };
