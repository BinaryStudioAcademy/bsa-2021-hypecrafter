import { EntityRepository, Repository } from 'typeorm';
import { UserProfile as InterfaceUserProfile } from '../../common/types';
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

  public async deductBalance(id: string, amount: number) {
    const userProfile = await this.findOne({ id });
    if (userProfile) {
      userProfile.balance = amount - Number(userProfile.balance);
      this.save(userProfile);
    }
    return userProfile;
  }

  public getByEmail(email: string) {
    return this.findOne({ email });
  }

  public async replenishmentBalance(id: string, amount: number) {
    const userProfile = await this.findOne({ id });
    if (userProfile) {
      userProfile.balance = amount + Number(userProfile.balance);
      this.save(userProfile);
    }
    return userProfile;
  }

  public getCurrentUser(id: string) {
    return this.createQueryBuilder('user')
      .select('"firstName", "lastName", id, "imageUrl"')
      .where({ id })
      .getRawOne();
  }

  public createUser(data: RegisterData) {
    const newUserProfile = Object.assign(new UserProfile(), data);
    return this.save(newUserProfile);
  }

  public async updateUserById(id: string, data: InterfaceUserProfile) {
    await this.update(id, data);
    return this.getById(id);
  }
}
