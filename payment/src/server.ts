import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import { createConnection } from 'typeorm';
import initRoutes from './api/routes';
import { env } from './env';
import { log } from './helpers/logger';

const { rabbit } = env.app;
console.log(env.app.payment);
const app = new MicroMq({
  name: Project.PAYMENT,
  rabbit,
  microservices: [Project.BACKEND]
});
createConnection().then(() => {
  initRoutes(app)?.start();
}).catch((e) => log(e));
