import { Project } from 'hypecrafter-shared/enums';
import MicroMq from 'micromq';
import * as cron from 'node-cron';
import { createConnection } from 'typeorm';
import { initActions } from './actions';
import initRoutes from './api/routes';
import { env } from './env';
import { log } from './helpers/logger';
import { initServices } from './services';

const { rabbit } = env.app;

const app = new MicroMq({
  name: Project.NOTIFICATION,
  rabbit
});

cron.schedule(
  '*/1 * * * *',
  () => {
    const hh = new Date().getHours();
    const mm = new Date().getMinutes();
    console.log(
      `this message must shows every minute(current time is ${hh}:${mm})`
    );
  },
  { scheduled: true }
);

createConnection()
  .then(() => {
    const services = initServices();
    initRoutes(app, services).start();
    initActions(app, services);
  })
  .catch((e) => log(e));
