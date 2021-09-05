import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ donateService }: Services, path: string) => (app: MicroMq) => app
  .post(
    `${path}`,
    wrap<Empty, { success: boolean }, { amount: number, projectId: string }, Empty>(
      async (req) => {
        const donate = await donateService
          .createDonate(req.body.amount, req.headers.userId as string, req.body.projectId);
        return { success: !!donate };
      }
    )
  );

export default init;
