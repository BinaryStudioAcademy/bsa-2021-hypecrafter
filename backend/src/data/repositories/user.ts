import { Repository, EntityRepository } from 'typeorm';
import { UserProfile } from '../entities/userProfile';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    console.log('Repository: ', this.findOne({ id }));
    return this.findOne({ id });
  }
}
