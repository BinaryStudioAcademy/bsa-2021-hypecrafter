import MicroMq from 'micromq';
import { RegisterReqBody } from '../../common/types/registration/registration';
import { wrap } from '../../helpers';
import { Services } from '../../services';

const init = ({ userService }: Services, path: string) => (app: MicroMq) => app.post(
  path,
  wrap<
  Empty,
  { accessToken: string; refreshToken: string },
  RegisterReqBody,
  Empty
  >((req) => userService.registerUser(req.body))
);

export default init;
