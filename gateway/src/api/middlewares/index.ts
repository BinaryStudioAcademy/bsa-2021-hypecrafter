import cors from 'cors';
import express, { Express, json, Response } from 'express';
import { Project } from 'hypecrafter-shared/enums';
import Gateway from 'micromq/gateway';
import path from 'path';
import swaggerUI, { JsonObject } from 'swagger-ui-express';
import YAML from 'yamljs';
import { BLACK_ROUTES } from '../../common/constants/blackRoutes';
import { ActionPath, SocketActions } from '../../common/enums';
import { env } from '../../env';
import { Services } from '../../services';
import { SocketController } from '../../services/socketController';
import { authorization } from './authorization';
import { handleError } from './error-handler';
import { logger } from './logger';
import { setUserInfo } from './setUserInfo';

const swaggerPath = path.resolve(
  __dirname,
  '../../../openApiDocumentation.yaml'
);
const swaggerDocument: JsonObject = YAML.load(swaggerPath);

export const initMiddlewares = (app: Express, _services: Services, socketController: SocketController) => {
  const { rabbit } = env.app;
  const gateway = new Gateway({
    microservices: [Project.BACKEND, Project.PAYMENT, Project.NOTIFICATION],
    rabbit
  });

  gateway.action(ActionPath.CommentNotification, async (meta: any, res: Response) => {
    const { data, comment } = meta;

    const { type,
      userName,
      projectName,
      createdAt: messageDate,
      amount: donation,
      id,
      projectId,
      userId: userIdData
    } = data;

    const dataToSend = {
      type,
      data: {
        user: {
          name: userName,
          link: userIdData
        },
        project: {
          name: projectName,
          link: projectId
        },
        messageDate,
        donation
      },
      id
    };

    socketController.send(data.recipient, SocketActions.NOTIFICATION, dataToSend);

    res.json(comment);
  });

  gateway.action(ActionPath.LikeNotifications, async (meta: any, res: Response) => {
    const { data, likesAndDislikes } = meta;

    const { type,
      userName,
      projectName,
      createdAt: messageDate,
      amount: donation,
      id,
      projectId,
      userId: userIdData
    } = data;

    const dataToSend = {
      type,
      data: {
        user: {
          name: userName,
          link: userIdData
        },
        project: {
          name: projectName,
          link: projectId
        },
        messageDate,
        donation
      },
      id
    };

    socketController.send(data.recipient, SocketActions.NOTIFICATION, dataToSend);

    res.json(likesAndDislikes);
  });

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use('/', authorization(BLACK_ROUTES));
  app.use('/', setUserInfo);
  app.use(cors());
  app.use(logger);
  app.use(json());
  app.use(express.urlencoded({ extended: true }));
  app.use(gateway.middleware());
  app.use(handleError);
};
