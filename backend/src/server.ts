import MicroMq from 'micromq';
import { Project } from 'hypecrafter-shared';
import initRoutes from './api/routes';
import { env } from './env';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.BACKEND,
  rabbit
});

initRoutes(app).start();
