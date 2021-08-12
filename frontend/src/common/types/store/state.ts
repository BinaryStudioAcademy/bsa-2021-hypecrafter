import { AuthState } from '../../../reducers/auth';
import { UsersState } from '../../../reducers/users';
import { ProjectState } from '../../../scenes/CreateProject/reducer';
import { UserProfileState } from '../../../scenes/UserPage/reducer';

export interface StoreState {
  userProfile: UserProfileState;
  auth: AuthState;
  project: ProjectState;
  users:UsersState
}
