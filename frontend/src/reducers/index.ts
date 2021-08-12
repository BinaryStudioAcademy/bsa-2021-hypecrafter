import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import mainPageReducer, { mainPageState } from '../scenes/MainPage/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';
import usersReducer, { initialState as usersInitialState } from './users';

const initialState: StoreState = {
  mainPage: mainPageState,
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState,
  users: usersInitialState
};

const rootReducer = combineReducers({
  mainPage: mainPageReducer,
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser,
  users: usersReducer
});

export { initialState, rootReducer };
