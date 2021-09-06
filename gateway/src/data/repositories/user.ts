import { EntityRepository, Repository } from 'typeorm';
import { RegisterData } from '../../common/types/registration/registration';
import { User } from '../entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getAll() {
    return this.find();
  }

  getById(id: string) {
    return this.findOne({ id });
  }

  getByEmail(email: string) {
    return this.findOne({ email });
  }

  getByFacebookId(facebookId: string) {
    return this.findOne({ facebookId });
  }

  createUser(data: RegisterData) {
    const newUser: User = Object.assign(new User(), data);
    return this.save(newUser);
  }

  getByGoogleId(googleId: string) {
    return this.findOne({ googleId });
  }
}
