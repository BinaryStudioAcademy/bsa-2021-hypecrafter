import MicroMq from 'micromq';
import { Payment } from '../../common/types';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ paymentService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => paymentService.getAll()))
  .get(`${path}/:id`, wrap<Empty, Payment, { id: string }, Empty>((req) => paymentService.getById(req.params.id)));

export default init;
