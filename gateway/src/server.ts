import cors from 'cors';
import express, { json } from 'express';
import { Project } from 'hypecrafter-shared/enums';
import Gateway from 'micromq/gateway';
import swaggerUI from 'swagger-ui-express';
import { createConnection } from 'typeorm';
import openApiDocumentation from '../openApiDocumentation.json';
import { handleError, logger } from './api/middlewares';
import initRoutes from './api/routes';
import { env } from './env';
import { log } from './helpers';

const { port, environment, rabbit } = env.app;
const gateway = new Gateway({
  microservices: [Project.BACKEND, Project.PAYMENT, Project.NOTIFICATION],
  rabbit
});

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openApiDocumentation));
app.use(cors());
app.use(logger);
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(gateway.middleware());
app.use(initRoutes());
app.use(handleError);

app.listen(port, async () => {
  try {
    log(`Server is running at port: ${port}. Environment: "${environment}"`);
    await createConnection();
  } catch (e) {
    log('App started with error', e);
  }
});

