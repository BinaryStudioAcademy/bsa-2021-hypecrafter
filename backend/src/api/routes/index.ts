import _ from 'lodash';
import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import { initServices } from '../../services';
import projectRouter from './project';
import topicRouter from './topic';
import userRouter from './user';

const initRoutes = (app: MicroMq) => {
  const services = initServices();
  return _.flow([
    userRouter(services, Path.User),
    topicRouter(services, Path.Topic),
    projectRouter(services, Path.Project)
  ])(app);
};

export default initRoutes;
