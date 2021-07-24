import { Router } from 'express';
import { User } from '../../common/types';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ userService }: Services) => {
  const router = Router();

  router
    .get('/', wrap(() => userService.getAll()))
    .get('/:id', wrap<Empty, User, { id: number }, Empty>((req) => userService.getById(req.body.id)));

  return router;
};

export default init;
