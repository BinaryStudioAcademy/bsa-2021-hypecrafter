import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import paymentRouter from './payment';
import services from '../../services';

const initRoutes = (app: MicroMq) => paymentRouter(services, Path.Payment, app);

export default initRoutes;
