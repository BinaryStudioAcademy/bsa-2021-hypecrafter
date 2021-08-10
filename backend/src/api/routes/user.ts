import MicroMq from 'micromq';
import { UserProfile } from '../../common/types';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ userService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => {
    console.log('user getAll');
    return userService.getAll();
  }))
  .get(`${path}/:id`, wrap<Empty, UserProfile, { id: string }, Empty>((req) => {
    console.log('GET Backend API');
    return userService.getById(req.params.id);
  }));

export default init;
