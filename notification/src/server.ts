import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { createConnection } from 'typeorm';
import initRoutes from './api/routes';
import { env } from './env';
import { log } from './helpers/logger';
import { JobController } from './schedule';
import { initServices } from './services';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.NOTIFICATION,
  rabbit,
  microservices: ['backend']
});

createConnection()
  .then(async () => {
    const services = initServices(app);
    const jobController = new JobController(app, services);
    initRoutes(app, jobController, services).start();
  })
  .catch((e) => log(e));
