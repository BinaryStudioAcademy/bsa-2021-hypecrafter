import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import usersReducer, { initialState as usersInitialState } from '../scenes/Users/reducer';

const initialState: StoreState = {
  users: usersInitialState
};

const rootReducer = combineReducers({
  users: usersReducer
});

export { initialState, rootReducer };
