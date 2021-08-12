import MicroMq from 'micromq';
import { Page } from '../../common/types';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ paymentService }: Services, path: string) => (app: MicroMq) => app.get(
  `${path}/:page`,
  wrap<Empty, Page, { page: string }, Empty>(async (req) => {
    const token: string = req.headers.authorization;
    return paymentService.getByToken(token, req.params.page);
  })
);

export default init;
