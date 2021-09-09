import { MainPageState } from '../../../components/MainView/reducer';
import { UserProfileState } from '../../../components/UserView/reducer';
import { ProjectPageState } from '../../../components/ProjectView/reducer';
import { AuthState } from '../../../reducers/auth';
import { AuthenticationState } from '../../../reducers/login';

export interface StoreState {
  auth: AuthState;
  authentication: AuthenticationState;
  mainPage: MainPageState;
  userPage: UserProfileState;
  projectPage: ProjectPageState
}
