import { EntityRepository, Repository } from 'typeorm';
import { RegisterData } from '../../common/types/registration';
import { UserProfile } from '../entities/userProfile';
import { UserProfile as InterfaceUserProfile } from '../../common/types';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public getByEmail(email: string) {
    return this.findOne({ email });
  }

  public createUser(data: RegisterData) {
    const newUserProfile = Object.assign(new UserProfile(), data);
    return this.save(newUserProfile);
  }

  public async updateUserById(id: string, data: InterfaceUserProfile) {
    await this.update(id, data);
    return { success: true };
  }
}
