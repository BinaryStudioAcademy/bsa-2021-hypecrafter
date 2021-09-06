import { combineReducers } from 'redux';
import { StoreState } from '../common/types';
import mainPageReducer, { mainPageState } from '../components/MainView/reducer';
import authReducer, { authState } from './auth';
import authenticationReducer, { authenticationState } from './login';

const initialState: StoreState = {
  auth: authState,
  authentication: authenticationState,
  mainPage: mainPageState
}
const rootReducer = combineReducers({
  auth: authReducer,
  authentication: authenticationReducer,
  mainPage: mainPageReducer
});

export { initialState, rootReducer };
