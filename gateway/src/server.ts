import cors from 'cors';
import express, { json } from 'express';
import Gateway from 'micromq/gateway';
import { Project } from 'hypecrafter-shared';
import { log } from './helpers';
import { handleError, logger } from './api/middlewares';
import initRoutes from './api/routes';
import { env } from './env';

const { port, environment, rabbit } = env.app;

const gateway = new Gateway({
  microservices: [Project.BACKEND, Project.PAYMENT],
  rabbit
});

const app = express();

app.use(cors());
app.use(logger);
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(gateway.middleware());
app.use(initRoutes());
app.use(handleError);

app.listen(port, () => {
  try {
    log(`Server is running at port: ${port}. Environment: "${environment}"`);
  } catch (e) {
    log('App started with error', e);
  }
});

