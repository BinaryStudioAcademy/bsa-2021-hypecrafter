import MicroMq from 'micromq';
import { UserProfile } from '../../common/types';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ userService }: Services, path: string) => (app: MicroMq) => app
  .get(`${path}/current-user`, wrap<Empty, UserProfile, Empty, { accessToken: string }>(
    (req) => userService.getCurrentUser(req.headers.userId as string)
  ));

export default init;
