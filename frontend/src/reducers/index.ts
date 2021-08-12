import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import projectReduser, { initialState as projectInitialState } from '../scenes/CreateProject/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  userProfile: userProfileInitialState,
  auth: authState,
  project: projectInitialState
};

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
  auth: authReducer,
  project: projectReduser
});

export { initialState, rootReducer };
