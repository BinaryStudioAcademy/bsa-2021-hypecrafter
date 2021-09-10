import { asyncForEach } from 'hypecrafter-shared/helpers/arrayHelper';
import { User } from '../entities/user';
import { usersData } from '../seed-data-production/userData';

export default class UserSeeder {
  public static async execute() {
    await asyncForEach(async user => {
      await Object.assign(new User(), user).save();
    }, usersData);
  }
}
