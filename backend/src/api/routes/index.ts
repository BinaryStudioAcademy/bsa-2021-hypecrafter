import _ from 'lodash';
import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import { Services } from '../../services';
import authRouter from './auth';
import categoryRouter from './category';
import chatRouter from './chat';
import commentRouter from './comment';
import donateRouter from './donate';
import projectRouter from './project';
import registerRouter from './registration';
import tagRouter from './tag';
import topicRouter from './topic';
import userRouter from './user';

const initRoutes = (app: MicroMq, services: Services) => _.flow([
  userRouter(services, Path.User),
  topicRouter(services, Path.Topic),
  projectRouter(services, Path.Project),
  registerRouter(services, Path.Register),
  registerRouter(services, Path.facebookAuth),
  registerRouter(services, Path.googleAuth),
  tagRouter(services, Path.Tag),
  categoryRouter(services, Path.Category),
  commentRouter(services, Path.Comment),
  authRouter(services, Path.Auth),
  donateRouter(services, Path.Donate),
  chatRouter(services, Path.Chat)
])(app);

export default initRoutes;
