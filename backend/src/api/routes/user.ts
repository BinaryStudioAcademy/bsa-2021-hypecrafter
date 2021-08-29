import MicroMq from 'micromq';
import { UserProfile } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

interface Success {
  success: boolean;
}

const init = ({ userService }: Services, path: string) => (app: MicroMq) => app
  .get(path, wrap(() => userService.getAll()))
  .get(`${path}/:id`, wrap<Empty, UserProfile, { id: string }, Empty>((req) => userService.getById(req.params.id)))
  .put(`${path}/:id`, wrap<Empty, Success, UserProfile, Empty>(req => (
    userService.updateById({ id: req.params.id, data: req.body })
  )));

export default init;
