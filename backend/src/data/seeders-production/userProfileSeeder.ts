import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { UserProfile } from '../entities/userProfile';
import { userProfiles } from '../seed-data-production/userProfileData';

export default class UserProfileSeeder {
  public static async execute() {
    await asyncForEach(async userProfile => {
      await Object.assign(new UserProfile(), userProfile).save();
    }, userProfiles);
  }
}
