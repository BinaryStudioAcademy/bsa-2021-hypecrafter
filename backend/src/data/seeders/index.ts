import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import UserProfileSeeder from './userProfileSeeder';
import CategorySeeder from './categorySeeder';
import projectData from './projectData';

createConnection()
  .then(async connection => {
    await UserProfileSeeder.execute();
    await CategorySeeder.execute();
    await projectData(connection);
  })
  .catch(e => log(e));
