import { Router } from 'express';
import { wrap } from '../../helpers/request';
import { Services } from '../../services/index';

const init = (services: Services) => {
  const router = Router();

  return router.get(
    '/',
    wrap(async (req) => {
      const token: string = <string>req.query.token;
      const tokenItem = await services.refreshTokenService.getByToken(token);
      if (tokenItem) {
        const { userId } = tokenItem;
        const user = await services.userService.getById(userId);
        return user;
      }
      return null;
    })
  );
};

export default init;
