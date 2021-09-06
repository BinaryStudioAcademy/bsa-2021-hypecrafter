import { AuthState } from '../../../reducers/auth';
import { MainPageState } from '../../../components/MainView/reducer';

export interface StoreState {
  auth: AuthState;
  mainPage: MainPageState;
}
