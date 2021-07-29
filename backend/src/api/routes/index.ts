import MicroMq from 'micromq';
import _ from 'lodash';
import { Path } from '../../common/enums';
import { initServices } from '../../services';
import userRouter from './user';

const initRoutes = (app: MicroMq) => {
  const services = initServices();
  return _.flow([userRouter(services, Path.User)])(app);
};

export default initRoutes;
