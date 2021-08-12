import { createConnection } from 'typeorm';
import MicroMq from 'micromq';
import { Project } from 'hypecrafter-shared/enums';
import { log } from './helpers/logger';
import initRoutes from './api/routes';
import { initRepositories } from './data/repositories';
import { initServices } from './services';
import { env } from './env';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.BACKEND,
  rabbit
});

createConnection().then(() => {
  const repositories = initRepositories();
  const services = initServices(repositories);
  initRoutes(app, services).start();
}).catch((e) => log(e));
