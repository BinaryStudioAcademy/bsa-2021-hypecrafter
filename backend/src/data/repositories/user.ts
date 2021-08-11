import { EntityRepository, Repository } from 'typeorm';
import { UserProfile } from '../entities/userProfile';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }
}
