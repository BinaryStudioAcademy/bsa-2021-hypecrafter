import { Repository, EntityRepository } from 'typeorm';
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
}
