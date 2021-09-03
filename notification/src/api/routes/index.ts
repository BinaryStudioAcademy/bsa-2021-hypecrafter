import _ from 'lodash';
import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import { Services } from '../../services';
import notificationRouter from './notification';

const initRoutes = (app: MicroMq, services: Services) => _.flow([notificationRouter(services, Path.Notification)])(app);

export default initRoutes;
