import { Router } from 'express';
import { Services } from '../../services';
import { Path } from '../../common/enums';
import userRouter from './user';
import authRouter from './auth';
import notificationRouter from './notification';
import topicRouter from './topic';
import projectRouter from './project';
import categoryRouter from './category';

const initRoutes = (services: Services) => {
  const router = Router();

  router.use(Path.Topic, topicRouter());
  router.use(Path.User, userRouter());
  router.use(Path.Auth, authRouter(services));
  router.use(Path.Notification, notificationRouter());
  router.use(Path.Project, projectRouter());
  router.use(Path.Category, categoryRouter());

  return router;
};

export default initRoutes;
