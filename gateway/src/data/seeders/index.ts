import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import UserSeeder from './userSeeder';

createConnection().then(async () => {
  await UserSeeder.execute();
}).catch(log);
