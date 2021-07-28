import { User } from '../entities/user';
import { usersData } from '../seed-data/usersData';
import { asyncForEach } from '../../helpers/arrayHelper';

export default class UserSeeder {
  public static async execute() {
    await asyncForEach(async user => {
      await Object.assign(new User(), user).save();
    }, usersData);
  }
}
