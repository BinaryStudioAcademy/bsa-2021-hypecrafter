import { Router } from 'express';
import { Services } from '../../services';
import { Path } from '../../common/enums';
import userRouter from './user';
import authRouter from './auth';
import notificationRouter from './notification';

const initRoutes = (services: Services) => {
  const router = Router();

  router.use(Path.User, userRouter());
  router.use(Path.Auth, authRouter(services));
  router.use(Path.Notification, notificationRouter());

  return router;
};

export default initRoutes;
