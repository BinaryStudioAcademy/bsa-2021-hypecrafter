/* eslint-disable import/no-extraneous-dependencies */
import { Repository, EntityRepository } from 'typeorm';
import { UserProfile } from '../entities';
import { IUser } from '../../common/interfaces';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> {
  public addUser(user: IUser): Promise<UserProfile> {
    return this.create(user).save();
  }
}
