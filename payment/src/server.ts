import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import initRoutes from './api/routes';
import { createConnection } from './data/db/createConnection';
import { env } from './env';
import { log } from './helpers';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.PAYMENT,
  rabbit
});

createConnection().then(() => {
  initRoutes(app).start();
}).catch((e) => log(e));
