import { MainPageState } from '../../../components/MainView/reducer';
import { AuthState } from '../../../reducers/auth';
import { AuthenticationState } from '../../../reducers/login';

export interface StoreState {
  auth: AuthState;
  authentication: AuthenticationState;
  mainPage: MainPageState;
}
