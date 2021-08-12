import { createConnection } from 'typeorm';
import MicroMq from 'micromq';
import { Project } from 'hypecrafter-shared/enums';
import { log } from './helpers/logger';
import initRoutes from './api/routes';
import { env } from './env';
import TransactionHistorySeeder from './data/seeders/transactionHistorySeeder';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.PAYMENT,
  rabbit
});

createConnection().then(async() => {
  await TransactionHistorySeeder.execute()
  initRoutes(app).start();
}).catch((e) => log(e));
