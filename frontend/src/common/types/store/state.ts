import { UserProfileState } from '../../../scenes/UserPage/reducer';
import { UsersState } from '../../../scenes/Users/reducer';
import { AuthState } from '../../../reducers/auth';

export interface StoreState {
  users: UsersState;
  userProfile: UserProfileState;
  auth: AuthState;
}
