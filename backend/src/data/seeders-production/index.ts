import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import CategorySeeder from './categorySeeder';
import TagsSeeder from './tagsSeeder';
import UserProfileSeeder from './userProfileSeeder';

createConnection()
  .then(async () => {
    await UserProfileSeeder.execute();
    await CategorySeeder.execute();
    await TagsSeeder.execute();
  })
  .catch(log);
