import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import UserProfileSeeder from './userProfileSeeder';
import CategorySeeder from './categorySeeder';

createConnection()
  .then(async () => {
    await UserProfileSeeder.execute();
    await CategorySeeder.execute();
  })
  .catch(e => log(e));
