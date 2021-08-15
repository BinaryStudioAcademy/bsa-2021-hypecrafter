import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { createConnection } from 'typeorm';
import initRoutes from './api/routes';
import { initRepositories } from './data/repositories';
import { env } from './env';
import { log } from './helpers/logger';
import { initServices } from './services';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.BACKEND,
  rabbit
});

createConnection().then(() => {
  const repositories = initRepositories();
  const services = initServices(repositories);
  initRoutes(app, services).start();
}).catch(log);
