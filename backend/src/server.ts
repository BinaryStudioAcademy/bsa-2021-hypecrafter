import express, { json } from 'express';
import { log } from './helpers';
import { handleError, logger } from './api/middlewares';
import initRoutes from './api/routes';
import { env } from './env';

const app = express();
const { port, environment } = env.app;

app.use(logger);
app.use(json());

app.use(initRoutes());

app.use(handleError);

app.listen(port, () => {
  try {
    // init db
    log(`Server runs on ${port}. Environment: "${environment}"`);
  } catch (e) {
    log('App started with error', e);
  }
});
