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
    userProfile.balance = amount + +userProfile.balance;
    return this.save(userProfile);
  }

  public createUser(data: RegisterData) {
    const newUserProfile = Object.assign(new UserProfile(), data);
    return this.save(newUserProfile);
  }
}
