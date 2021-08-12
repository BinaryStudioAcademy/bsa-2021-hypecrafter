import MicroMq from 'micromq';
import _ from 'lodash';
import { Path } from '../../common/enums';
import registerRouter from './registration';
import userRouter from './user';
import { Services } from './../../services';

const initRoutes = (app: MicroMq, services: Services) => {
  return _.flow([userRouter(services, Path.User), registerRouter(services, Path.Register)])(app);
};

export default initRoutes;
