import MicroMq from 'micromq';
import { Page } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ transactionHistoryService }: Services, path: string) => (app: MicroMq) => app.get(
  `${path}/:userId/:page`,
  wrap<Empty, Page, { page: string, userId: string }, Empty>(
    async (req) => transactionHistoryService.getByUserId(req.params.userId, req.params.page)
  )
);

export default init;
