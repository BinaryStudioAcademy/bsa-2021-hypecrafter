import { createConnection } from 'typeorm';
import UserSeeder from './userSeeder';

createConnection().then(async () => {
  await UserSeeder.execute();
}).catch(e => {
  // eslint-disable-next-line no-console
  console.log(e);
});
