import express, { Express, json } from 'express';
import cors from 'cors';
import Gateway from 'micromq/gateway';
import { Project } from 'hypecrafter-shared/enums';
import swaggerUI from 'swagger-ui-express';
import { handleError } from './error-handler';
import { logger } from './logger';
import { Services } from '../../services';
import openApiDocumentation from '../../../openApiDocumentation.json';
import { env } from '../../env';

export * from './logger';
export * from './error-handler';

export const initMiddlewares = (app: Express, _services: Services) => {
  const { rabbit } = env.app;
  const gateway = new Gateway({
    microservices: [Project.BACKEND, Project.PAYMENT, Project.NOTIFICATION],
    rabbit
  });

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openApiDocumentation));
  app.use(cors());
  app.use(logger);
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  app.use(gateway.middleware());
  app.use(handleError);
};
