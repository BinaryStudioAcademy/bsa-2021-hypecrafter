import { UsersState } from '../../../scenes/Users/reducer';
import { AuthState } from '../../../reducers/auth';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
import { RegistrationState } from '../../../scenes/SignupPage/reducer'

export interface StoreState {
  users: UsersState;
  auth: AuthState;
  project: ProjectState;
  registration: RegistrationState;
}
