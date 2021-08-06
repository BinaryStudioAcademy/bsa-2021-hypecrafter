import { createConnection } from 'typeorm';
import MicroMq from 'micromq';
import { Project } from 'hypecrafter-shared/enums';
import * as cron from 'node-cron';
import { log } from './helpers/logger';
import initRoutes from './api/routes';
import { env } from './env';

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
    initRoutes(app).start();
  })
  .catch((e) => log(e));
