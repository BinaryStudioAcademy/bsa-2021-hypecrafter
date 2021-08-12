import { UserProfile } from './../../data/entities/userProfile';
import MicroMq from 'micromq';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ userService }: Services, path: string) => (app: MicroMq) => {
  console.log('path', path);
  return app
  .get(path, wrap(async () => ({ result: userService.getAll() })))
  .get(`${path}/:id`, wrap<Empty, Promise<UserProfile>, { id: string }, Empty>(async (req) => ({ result: userService.getById(req.params.id)})));
}

export default init;
