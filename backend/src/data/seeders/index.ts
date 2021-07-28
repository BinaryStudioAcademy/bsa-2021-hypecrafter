import { createConnection } from 'typeorm';
import UserProfileSeeder from './userProfileSeeder';

createConnection().then(async () => {
  await UserProfileSeeder.execute();
}).catch(e => {
  console.log(e);
});
