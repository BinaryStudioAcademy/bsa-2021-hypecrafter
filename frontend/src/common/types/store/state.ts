import { AuthState } from '../../../reducers/auth';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
<<<<<<< HEAD
import { RegistrationState } from '../../../scenes/SignupPage/reducer'
=======
import { MainPageState } from '../../../scenes/MainPage/reducer';
import { UserProfileState } from '../../../scenes/UserPage/reducer';
>>>>>>> develop

export interface StoreState {
  mainPage: MainPageState;
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
  registration: RegistrationState;
}
