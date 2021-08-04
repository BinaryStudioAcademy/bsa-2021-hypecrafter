import express from 'express';
import { createConnection } from 'typeorm';
import { initMiddlewares } from './api/middlewares';
import initRoutes from './api/routes';
import { initRepositories } from './data/repositories';
import { env } from './env';
import { log } from './helpers';
import { initServices } from './services';

const { port, environment } = env.app;
const app = express();

createConnection().then(() => {
  try {
    const repositories = initRepositories();
    const services = initServices(repositories);
    initMiddlewares(app, services);
    app.use(initRoutes());
    app.listen(port, () => {
      log(`Server is running at port: ${port}. Environment: "${environment}"`);
    });
  } catch (e) {
    log('App started with error', e);
  }
}, err => log('Connection to database was failed.', err));
