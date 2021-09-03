import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authReducer, { authState } from './auth';
import authenticationReducer, { authenticationState } from './login';

const initialState: StoreState = {
  auth: authState,
  authentication: authenticationState
};

const rootReducer = combineReducers({
  auth: authReducer,
  authentication: authenticationReducer
});

export { initialState, rootReducer };
