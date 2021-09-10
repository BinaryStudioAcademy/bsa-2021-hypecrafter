import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { createConnection } from 'typeorm';
import { initActions } from './actions';
import initRoutes from './api/routes';
import { initRepositories } from './data/repositories';
import { env } from './env';
import { log } from './helpers/logger';
import { initServices } from './services';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.BACKEND,
  rabbit,
  microservices: [Project.NOTIFICATION, Project.PAYMENT],
});

createConnection().then(() => {
  const repositories = initRepositories();
  const services = initServices(repositories, app);
  initRoutes(app, services).start();
  initActions(app, services);
}).catch(log);
