import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authenticationReducer, { initialState as authenticationInitialState } from '../scenes/Auth/reducer';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import projectPageReducer, { projectPageState } from '../scenes/ProjectPage/reducer';
import projectsReducer, { initialState as projectsInitialState } from '../scenes/Projects/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import transactionsReducer, { initialState as transactionsInitialState } from '../scenes/Wallet/Transactions/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  transactions: transactionsInitialState,
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  projects: projectsInitialState,
  projectPage: projectPageState,
  authentication: authenticationInitialState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  projects: projectsReducer,
  projectPage: projectPageReducer,
  transactions: transactionsReducer,
  authentication: authenticationReducer
});

export { initialState, rootReducer };
