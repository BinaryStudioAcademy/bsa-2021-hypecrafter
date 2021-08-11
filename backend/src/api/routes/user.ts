import MicroMq from 'micromq';
import { UserProfile } from '../../common/types';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ userService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => userService.getAll()))
  .get(`${path}/:id`, wrap<Empty, UserProfile, { id: string }, Empty>((req) => userService.getById(req.params.id)));

export default init;
