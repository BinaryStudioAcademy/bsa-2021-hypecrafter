import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import usersReducer, { initialState as usersInitialState } from '../scenes/Users/reducer';
import userProfileReducer, { initialState as userProfileInitialState } from '../scenes/UserPage/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  users: usersInitialState,
  userProfile: userProfileInitialState,
  auth: authState
};

const rootReducer = combineReducers({
  users: usersReducer,
  userProfile: userProfileReducer,
  auth: authReducer
});

export { initialState, rootReducer };
