import { Router } from 'express';
import { Path } from '../../common/enums';
import { Services } from '../../services';
import authRouter from './auth';
import invalidRouter from './invalid';
import notificationRouter from './notification';
import projectRouter from './project';
import topicRouter from './topic';
import userRouter from './user';

const initRoutes = (services: Services) => {
  const router = Router();

  router.use(Path.Topic, topicRouter());
  router.use(Path.User, userRouter());
  router.use(Path.Auth, authRouter(services));
  router.use(Path.Notification, notificationRouter());
  router.use(Path.Project, projectRouter());
  router.use(Path.Invalid, invalidRouter())
  return router;
};

export default initRoutes;
