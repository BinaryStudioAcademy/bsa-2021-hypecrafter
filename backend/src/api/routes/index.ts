import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import userRouter from './user';
import services from '../../services';

const initRoutes = (app: MicroMq) => {
  app.use(Path.User, userRouter(services));

  return app;
};

export default initRoutes;
