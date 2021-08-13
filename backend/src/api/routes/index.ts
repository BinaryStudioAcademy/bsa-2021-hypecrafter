import _ from 'lodash';
import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import { Services } from './../../services';
import projectRouter from './project';
import registerRouter from './registration';
import topicRouter from './topic';
import userRouter from './user';

const initRoutes = (app: MicroMq, services: Services) => {
  return _.flow([
    userRouter(services, Path.User),
    topicRouter(services, Path.Topic),
    projectRouter(services, Path.Project),
    registerRouter(services, Path.Register)
  ])(app);
};

export default initRoutes;
