import MicroMq from 'micromq';
import { Path } from '../../common/enums';
import userRouter from './user';
import services from '../../services';

const initRoutes = (app: MicroMq) => userRouter(services, Path.User, app);

export default initRoutes;
