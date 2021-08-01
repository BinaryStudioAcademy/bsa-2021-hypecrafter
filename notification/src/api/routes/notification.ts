import MicroMq from 'micromq';
import { Notification } from '../../common/types';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ notificationService }: Services, path: string) => (app: MicroMq) => app
  .get(`${path}`, wrap(() => notificationService.getAll()))
  .get(`${path}/:id`,
    wrap<Empty, Notification, { id: string }, Empty>((req) => notificationService.getById(req.params.id)));

export default init;
