import MicroMq from 'micromq';
import { UserProfile } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ userService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => userService.getAll()))
  .get(`${path}/:id`, wrap<Empty, UserProfile, { id: string }, Empty>((req) => userService.getById(req.params.id)));

export default init;
