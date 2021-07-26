import { Router } from 'express';
import { Path } from '../../common/enums';
import userRouter from './user';
//import services from '../../services';

const initRoutes = () => {
  const router = Router();

  router.use(Path.User, userRouter());

  return router;
};

export default initRoutes;
