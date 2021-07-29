import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import notificationRouter from './notification';
import services from '../../services';

const initRoutes = (app: MicroMq) => notificationRouter(services, Path.Notification, app);

export default initRoutes;
