import { createConnection, getCustomRepository } from 'typeorm';
import { UserRepository } from '../../data/repositories';
import UserService from './user';

// eslint-disable-next-line import/no-mutable-exports
let userService: UserService = null;
createConnection().then(() => {
  userService = new UserService(
    getCustomRepository(UserRepository)
  );
});

export default userService;
