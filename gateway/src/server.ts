import cors from 'cors';
import express from 'express';
import { createConnection } from 'typeorm';
import UserSeeder from '../src/data/seeders/userSeeder';
import { initMiddlewares } from './api/middlewares';
import { initPassport } from './api/passport';
import initRoutes from './api/routes';
import { initRepositories } from './data/repositories';
import { env } from './env';
import { log } from './helpers';
import { initServices } from './services';

const { port, environment } = env.app;
const app = express();
app.use(cors());
createConnection().then(async() => {
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
