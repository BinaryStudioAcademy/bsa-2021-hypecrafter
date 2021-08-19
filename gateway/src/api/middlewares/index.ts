import cors from 'cors';
import express, { Express, json } from 'express';
import { Project } from 'hypecrafter-shared/enums';
import Gateway from 'micromq/gateway';
import path from 'path';
import swaggerUI, { JsonObject } from 'swagger-ui-express';
import YAML from 'yamljs';
import { BLACK_ROUTES } from '../../common/constants/blackRoutes';
import { WHITE_ROUTES } from '../../common/constants/whiteRouts';
import { env } from '../../env';
import { Services } from '../../services';
import { authorization } from './authorization';
import { handleError } from './error-handler';
import { logger } from './logger';

const swaggerPath = path.resolve(
  __dirname,
  '../../../openApiDocumentation.yaml'
);
const swaggerDocument: JsonObject = YAML.load(swaggerPath);

export const initMiddlewares = (app: Express, _services: Services) => {
  const { rabbit } = env.app;
  const gateway = new Gateway({
    microservices: [Project.BACKEND, Project.PAYMENT, Project.NOTIFICATION],
    rabbit,
  });
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use('/', authorization(WHITE_ROUTES, BLACK_ROUTES));
  app.use(cors());
  app.use(logger);
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  app.use(gateway.middleware());
  app.use(handleError);
};
