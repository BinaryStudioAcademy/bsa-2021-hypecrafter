import { Router } from 'express';
import { Path } from '../../common/enums';
import userRouter from './user';
import notificationRouter from './notification';

const initRoutes = () => {
  const router = Router();

  router.use(Path.User, userRouter());
  router.use(Path.Notification, notificationRouter());

  return router;
};

export default initRoutes;
