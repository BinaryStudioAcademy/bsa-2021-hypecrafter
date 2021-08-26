import MicroMq from 'micromq';
import { UserProfile } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

interface MetaReplenishment{
  id: string;amount: number;
}
const init = ({ userService }: Services, path: string) => (app: MicroMq) => {
  app
    .get(path, wrap(() => userService.getAll()))
    .get(`${path}/:id`, wrap<Empty, UserProfile, { id: string }, Empty>((req) => userService.getById(req.params.id)));
  app.action('replenishment', async (meta, res) => {
    console.log(meta);
    const payload = meta as MetaReplenishment;
    await userService.replenishment(payload.id, payload.amount);
    res.status(200);
  });
  return app;
};

export default init;
