import { createConnection } from 'typeorm';
import cors from 'cors';
import express, { json } from 'express';
import Gateway from 'micromq/gateway';
import { Project } from 'hypecrafter-shared/enums';
import swaggerUI from 'swagger-ui-express';
import { log } from './helpers';
import { handleError, logger, authorization } from './api/middlewares';
import initRoutes from './api/routes';
import { env } from './env';
import openApiDocumentation from '../openApiDocumentation.json';
import passport from 'passport';
import './config/passport';
import { WHITE_ROUTES } from './common/constants/whiteRouts';

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
app.use(handleError);
app.use(passport.initialize());
app.use('/api', authorization(WHITE_ROUTES));

app.listen(port, async () => {
  try {
    log(`Server is running at port: ${port}. Environment: "${environment}"`);
    await createConnection();
    app.use(initRoutes());
  } catch (e) {
    log('App started with error', e);
  }
});

