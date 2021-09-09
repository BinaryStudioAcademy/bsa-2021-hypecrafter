import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ donateService }: Services, path: string) => (app: MicroMq) => app
  .post(
    path,
    wrap<Empty, { success: boolean }, { amount: number, projectId: string }, Empty>(
      async (req) => {
        const success = await donateService
          .createDonate(req.body.amount, req.headers.userId as string, req.body.projectId);
        console.log(50, success);
        return { success: !!success };
      }
    )
  );

export default init;
