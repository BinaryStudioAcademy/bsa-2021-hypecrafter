import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { createConnection } from 'typeorm';
import initRoutes from './api/routes';
import seeder from './data/seeders/transactionHistorySeeder';
import { env } from './env';
import { log } from './helpers/logger';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.PAYMENT,
  rabbit
});

createConnection().then(() => {
  seeder.execute();
  initRoutes(app).start();
}).catch((e) => log(e));
