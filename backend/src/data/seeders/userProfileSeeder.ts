import { UserProfile } from '../entities/userProfile';
import { userProfiles } from '../seed-data/userProfileData';
import { asyncForEach } from '../../helpers/arrayHelper';

export default class UserProfileSeeder {
  public static async execute() {
    await asyncForEach(async userProfile => {
      await Object.assign(new UserProfile(), userProfile).save();
    }, userProfiles);
  }
}
