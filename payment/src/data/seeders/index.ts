import { log } from '../../helpers/logger';
import { createConnection } from '../db/createConnection';
import PaymentSeeder from './paymentSeeder';

createConnection().then(async () => {
  await PaymentSeeder.execute();
}).catch(log);
