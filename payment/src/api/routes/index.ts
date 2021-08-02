import MicroMq from 'micromq';
import _ from 'lodash';
import { Path } from '../../common/enums';
import { initServices } from '../../services';
import paymentRouter from './payment';

const initRoutes = (app: MicroMq) => {
  const services = initServices();
  return _.flow([paymentRouter(services, Path.Payment)])(app);
};

export default initRoutes;
