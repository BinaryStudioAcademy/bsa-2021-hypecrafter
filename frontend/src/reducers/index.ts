import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import usersReducer, { initialState as usersInitialState } from '../scenes/Users/reducer';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  users: usersInitialState,
  auth: authState
};

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer
});

export { initialState, rootReducer };
