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
    const payload = meta as MetaReplenishment;
    const userProfile = await userService.replenishment(payload.id, payload.amount);
    console.log(1);
    if (userProfile) {
      res.json({ ok: true });
    }
    res.json({ ok: false });
  });
  return app;
};

export default init;
