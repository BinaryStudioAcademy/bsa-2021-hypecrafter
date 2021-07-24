import { Router } from 'express';
import { User } from '../../common/types';
import { Services } from '../../services';
import { wrap } from '../../helpers';

const init = ({ userService }: Services) => {
  const router = Router();

  router
    .get('/', wrap(() => userService.getAll()))
    .get('/:id', wrap<Empty, User, { id: string }, Empty>((req) => userService.getById(req.params.id)));

  return router;
};

export default init;
