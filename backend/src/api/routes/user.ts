import MicroMq from 'micromq';
import { wrap } from '../../helpers';
import { Services } from '../../services';
import { UserProfile } from './../../data/entities/userProfile';

const init = ({ userService }: Services, path: string) => (app: MicroMq) => {
  console.log('path', path);
  return app
  .get(path, wrap(async () => ({ result: userService.getAll() })))
  .get(`${path}/:id`, wrap<Empty, Promise<UserProfile>, { id: string }, Empty>(async (req) => ({ result: userService.getById(req.params.id)})));
}

export default init;
