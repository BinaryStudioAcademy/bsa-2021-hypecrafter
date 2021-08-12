import { createConnection } from 'typeorm';
import MicroMq from 'micromq';
import { Project } from 'hypecrafter-shared/enums';
import { log } from './helpers/logger';
import initRoutes from './api/routes';
import ProjectSeeder from './data/seeders/projectSeeder';
import { env } from './env';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.BACKEND,
  rabbit
});

createConnection().then(async () => {
  await ProjectSeeder.execute();
  initRoutes(app).start();
}).catch((e) => log(e));
