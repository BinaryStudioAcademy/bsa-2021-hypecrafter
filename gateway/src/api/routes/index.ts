import { Router } from 'express';
import { Path } from '../../common/enums';
import userRouter from './user';
import authRouter from './auth';
import { initServices } from '../../services';

const initRoutes = () => {
  const services = initServices();
  const router = Router();

  router.use(Path.User, userRouter());
  router.use(Path.Auth, authRouter(services));

  return router;
};

export default initRoutes;
