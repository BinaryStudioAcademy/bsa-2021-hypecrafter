import { createConnection } from 'typeorm';
import MicroMq from 'micromq';
import { Project } from 'hypecrafter-shared/enums';
import { log } from './helpers/logger';
import initRoutes from './api/routes';
import { env } from './env';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.BACKEND,
  rabbit
});

createConnection().then(() => {
  initRoutes(app).start();
}).catch((e) => log(e));
