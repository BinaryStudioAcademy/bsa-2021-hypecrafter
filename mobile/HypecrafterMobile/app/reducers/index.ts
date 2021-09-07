import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authReducer, { authState } from './auth';

const initialState: StoreState = {
  auth: authState
};

const rootReducer = combineReducers({
  auth: authReducer
});

export { initialState, rootReducer };
