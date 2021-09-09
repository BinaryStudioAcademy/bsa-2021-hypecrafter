import { createConnection } from 'typeorm';
import { log } from '../../helpers/logger';
import NotificationSeeder from './notificationsSeeder';

createConnection()
  .then(async () => {
    await NotificationSeeder.execute();
  })
  .catch(log);
