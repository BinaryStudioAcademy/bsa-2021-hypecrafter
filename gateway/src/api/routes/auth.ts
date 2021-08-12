import { Router } from 'express';
import { authentication as authenticationMiddleware } from '../middlewares/authentication';
import { registration as registrationMiddleware } from '../middlewares/registration';
import { User } from '../../data/entities/user';
import { Services } from '../../services/index';
import { wrap } from '../../helpers/request';
import { AuthApiPath } from '../../common/enums';
import { Project } from 'hypecrafter-shared/enums';

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
    )
    .post(
      AuthApiPath.Register,
      registrationMiddleware,
      async (req, res) => {
        const newUser: User = await services.authService.registerUser(req.body.email, req.body.password);
        if (newUser) {
          const userId: string = newUser.id;
          const userAgentInfo: string = req.headers['user-agent'];
          const tokens: { accessToken: string; refreshToken: string } =
            services.authService.loginUser(userId, userAgentInfo);
            req.body = { data: req.body, tokens };
          res.delegate(Project.BACKEND);
        } else {
          res.send(500);
        }
      }
    )
};

export default init;
