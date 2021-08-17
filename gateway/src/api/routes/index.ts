import { Router } from 'express';
import { Path } from '../../common/enums';
import { Services } from '../../services';
import authRouter from './auth';
import notificationRouter from './notification';
import paymentRouter from './payment';
import projectRouter from './project';
import categoryRouter from './category';
import topicRouter from './topic';
import userRouter from './user';

const initRoutes = (services: Services) => {
  const router = Router();

  router.use(Path.Topic, topicRouter());
  router.use(Path.User, userRouter());
  router.use(Path.Auth, authRouter(services));
  router.use(Path.Notification, notificationRouter());
  router.use(Path.Payment, paymentRouter());
  router.use(Path.Project, projectRouter());
  router.use(Path.Category, categoryRouter());

  return router;
};

export default initRoutes;
