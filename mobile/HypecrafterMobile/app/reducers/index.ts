import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import authReducer, { authState } from './auth';
import mainPageReducer, { mainPageState } from '../components/MainView/reducer';

const initialState: StoreState = {
  auth: authState,
  mainPage: mainPageState
};

const rootReducer = combineReducers({
  auth: authReducer,
  mainPage: mainPageReducer
});

export { initialState, rootReducer };
