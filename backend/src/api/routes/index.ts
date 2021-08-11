import MicroMq from 'micromq';
import _ from 'lodash';
import { Path } from '../../common/enums';
import { initServices } from '../../services';
import userRouter from './user';
import topicRouter from './topic';
import projectRouter from './project';

const initRoutes = (app: MicroMq) => {
  const services = initServices();
  return _.flow([
    userRouter(services, Path.User), topicRouter(services, Path.Topic), projectRouter(services, Path.Project)])(app);
};

export default initRoutes;
