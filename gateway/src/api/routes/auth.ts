import { Router } from 'express';
import { authentication as authenticationMiddleware } from './../middlewares/authentication';
import { User } from '../../data/entities/user';
import { Services } from '../../services/index';
import { wrap } from '../../helpers/request';
import { AuthApiPath } from '../../common/enums';

const init = (services: Services) => {
  const router = Router();

  return router
    .post(
      AuthApiPath.Login,
      authenticationMiddleware,
      wrap<
        Empty,
        { accessToken: string; refreshToken: string },
        { id: string },
        Empty
      >(async (req) => {
        const userId: string = (req.user as User).id;
        const userAgentInfo: string = req.headers['user-agent'];
        const result: { accessToken: string; refreshToken: string } = (
          services.authService.loginUser(userId, userAgentInfo)
        );
        return { result };
      })
    )
    .post(
      AuthApiPath.Token,
      wrap<
        Empty,
        { accessToken: string },
        { userId: string; refreshToken: string },
        Empty
      >(async (req) => {
        const { userId, refreshToken } = req.body;
        try {
          const result = await services.authService.createAccessToken(
            userId,
            refreshToken
          );
          return { result };
        } catch (err) {
          return { statusCode: 401 };
        }
      })
    )
    .post(
      AuthApiPath.TokenReject,
      wrap<Empty, Empty, { refreshToken: string }, Empty>(async (req) => {
        const { refreshToken } = req.body;
        await services.authService.deleteRefreshToken(refreshToken);
        return { statusCode: 204 };
      })
    );
};

export default init;
