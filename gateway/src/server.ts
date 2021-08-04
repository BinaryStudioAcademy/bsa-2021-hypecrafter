import { createConnection } from 'typeorm';
import express from 'express';
import { log } from './helpers';
import initRoutes from './api/routes';
import { env } from './env';
import { initMiddlewares } from './api/middlewares';
import { initServices } from './services';
import { initRepositories } from './data/repositories';

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
