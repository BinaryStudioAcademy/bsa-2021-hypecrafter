import { log } from '../../helpers/logger';
import { createConnection } from '../db/createConnection';
import PaymentSeeder from './paymentSeeder';

createConnection().then(async () => {
  await PaymentSeeder.execute();
  setTimeout(() => process.exit(0), 5000);
}).catch(log);
