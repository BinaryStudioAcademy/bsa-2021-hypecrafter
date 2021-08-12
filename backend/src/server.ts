import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { createConnection } from 'typeorm';
import initRoutes from './api/routes';
import { env } from './env';
import { log } from './helpers/logger';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.BACKEND,
  rabbit
});

createConnection()
  .then(() => {
    initRoutes(app).start();
  })
  .catch(log);
