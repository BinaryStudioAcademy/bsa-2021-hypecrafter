import { EntityRepository, Repository } from 'typeorm';
import { RegisterData } from '../../common/types/registration';
import { UserProfile } from '../entities/userProfile';

@EntityRepository(UserProfile)
export class UserRepository extends Repository<UserProfile> {
  public getAll() {
    return this.find();
  }

  public getById(id: string) {
    return this.findOne({ id });
  }

  public async replenishmentBalance(id: string, amount: number) {
    const userProfile = await this.findOne({ id });
    if (userProfile) {
      userProfile.balance = amount + +userProfile.balance;
      this.save(userProfile);
    }
    return userProfile;
  }

  public createUser(data: RegisterData) {
    const newUserProfile = Object.assign(new UserProfile(), data);
    return this.save(newUserProfile);
  }
}
