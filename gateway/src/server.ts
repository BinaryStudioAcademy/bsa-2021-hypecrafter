import { createConnection } from 'typeorm';
import express from 'express';
import { log } from './helpers';
import {  authorization, initMiddlewares } from './api/middlewares';
import initRoutes from './api/routes';
import { env } from './env';
import passport from 'passport';
import './config/passport';
import { WHITE_ROUTES } from './common/constants/whiteRouts';
import { initServices } from './services';
import { initRepositories } from './data/repositories';

const { port, environment } = env.app;
const app = express();

app.use(passport.initialize());
app.use('/api', authorization(WHITE_ROUTES));

createConnection().then(() => {
  try {
    const repositories = initRepositories();
    const services = initServices(repositories);
    initMiddlewares(app, services);
    app.use(initRoutes(services));
    app.listen(port, () => {
      log(`Server is running at port: ${port}. Environment: "${environment}"`);
    });
  } catch (e) {
    log('App started with error', e);
  }
}, err => log('Connection to database was failed.', err));
