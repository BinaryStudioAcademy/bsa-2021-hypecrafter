import { createConnection } from 'typeorm';
import UserSeeder from './userSeeder';

createConnection().then(async () => {
  await UserSeeder.execute();
}).catch(e => {
  console.log(e);
});
