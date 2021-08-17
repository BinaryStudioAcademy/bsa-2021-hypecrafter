import _ from 'lodash';
import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import { initServices } from '../../services';
import categoryRouter from './category';
import projectRouter from './project';
import tagRouter from './tag';
import topicRouter from './topic';
import userRouter from './user';

const initRoutes = (app: MicroMq) => {
  const services = initServices();
  return _.flow([
    userRouter(services, Path.User),
    topicRouter(services, Path.Topic),
    projectRouter(services, Path.Project),
    tagRouter(services, Path.Tag),
    categoryRouter(services, Path.Category)
  ])(app);
};

export default initRoutes;
