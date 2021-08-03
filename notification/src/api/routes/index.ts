import MicroMq from 'micromq';
import _ from 'lodash';
import { Path } from '../../common/enums';
import notificationRouter from './notification';
import { initServices } from '../../services';

const initRoutes = (app: MicroMq) => {
  const services = initServices();
  return _.flow([notificationRouter(services, Path.Notification)])(app);
};

export default initRoutes;
