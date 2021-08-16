import { AuthState } from '../../../reducers/auth';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
import { MainPageState } from '../../../scenes/MainPage/reducer';
import { RegistrationState } from '../../../scenes/SignupPage/reducer';
import { UserProfileState } from '../../../scenes/UserPage/reducer';

export interface StoreState {
  mainPage: MainPageState;
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
  registration: RegistrationState;
}
