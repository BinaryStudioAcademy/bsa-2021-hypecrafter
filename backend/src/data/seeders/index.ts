import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import UserProfileSeeder from './userProfileSeeder';

createConnection()
  .then(async () => {
    await UserProfileSeeder.execute();
  })
  .catch(log);
