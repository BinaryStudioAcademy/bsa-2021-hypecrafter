import { createConnection } from 'typeorm';
import express from 'express';
import { log } from './helpers';
import { initMiddlewares } from './api/middlewares';
import initRoutes from './api/routes';
import { env } from './env';
import { initServices } from './services';
import { initRepositories } from './data/repositories';
import { initPassport } from './api/passport';
import UserSeeder from './data/seeders/userSeeder'
const { port, environment } = env.app;
const app = express();

createConnection().then(async () => {
  try {
    await UserSeeder.execute();
    const repositories = initRepositories();
    const services = initServices(repositories);
    initPassport(app, repositories);
    initMiddlewares(app, services);
    app.use(initRoutes(services));
    app.listen(port, () => {
      log(`Server is running at port: ${port}. Environment: "${environment}"`);
    });
  } catch (e) {
    log('App started with error', e);
  }
}, err => log('Connection to database was failed.', err));
