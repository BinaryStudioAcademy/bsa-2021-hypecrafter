import { userRepository } from '../../data/repositories';
import UserService from './user';

const userService = new UserService(
  userRepository
);

export default userService;
