import { UsersState } from '../../../scenes/Users/reducer';
import { AuthState } from '../../../reducers/auth';
import { ProjectState } from '../../../reducers/projects';

export interface StoreState {
  projects: ProjectState;
  users: UsersState;
  auth: AuthState;
}
