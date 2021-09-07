import _ from 'lodash';
import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import { JobController } from '../../schedule';
import { Services } from '../../services';
import notificationRouter from './notification';

const initRoutes = (
  app: MicroMq,
  jobController: JobController,
  services: Services
) => _.flow([notificationRouter(services, jobController, Path.Notification)])(app);

export default initRoutes;
