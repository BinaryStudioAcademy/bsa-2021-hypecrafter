import MicroMq from 'micromq';
import _ from 'lodash';
import { Path } from '../../common/enums';
import { initServices } from '../../services';
import userRouter from './user';
import topicRouter from './topic';

const initRoutes = (app: MicroMq) => {
  const services = initServices();
  return _.flow([userRouter(services, Path.User), topicRouter(services, Path.Topic)])(app);
};

export default initRoutes;
