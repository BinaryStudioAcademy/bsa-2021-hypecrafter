import { Request, Response, Router } from 'express';
import { HttpStatusCode, Project } from 'hypecrafter-shared/enums';
import { AuthApiPath } from '../../common/enums';
import { Tokens } from '../../common/types/registration';
import { User } from '../../data/entities/user';
import { CustomError } from '../../helpers/customError';
import { getGoogleInfo } from '../../helpers/getGoogleInfo';
import { wrap } from '../../helpers/request';
import { Services } from '../../services/index';
import { authentication as authenticationMiddleware } from '../middlewares/authentication';
import { facebook } from '../middlewares/facebook';
import { registration as registrationMiddleware } from '../middlewares/registration';

const init = (services: Services) => {
  const router = Router();

  return router
    .post(AuthApiPath.Google, async (req, res) => {
      const { token } = req.body;
      const data = await getGoogleInfo(token);
      const { email, googleId, firstName, lastName, region } = data;
      const userAgentInfo: string = req.headers['user-agent'];

      const user = await services.authService.getUserByGoogleId(googleId);
      if (!user) {
        const newUser = await services.authService.registerUserWithGoogle(
          email,
          googleId
        );
        const newUserId = newUser.id;
        const newUserTokens = services.authService.loginUser(newUserId, userAgentInfo);
        req.body = {
          data: { email, googleId, firstName, lastName, region },
          tokens: newUserTokens
        };
        res.delegate(Project.BACKEND);
      } else {
        const userId = user.id;
        const tokens = services.authService.loginUser(userId, userAgentInfo);
        res.json(tokens);
      }
    })
    .post(
      AuthApiPath.Facebook,
      facebook,
      async (req: Request, res: Response) => {
        const { facebookId, firstName, lastName, email } = req.user as any;
        const userAgentInfo: string = req.headers['user-agent'];
        const user = await services.authService.getUserByFacebookId(facebookId);
        if (!user) {
          const newUser = await services.authService.registerUserWithFacebook(
            email,
            facebookId
          );
          const newUserId = newUser.id;
          const newUserTokens = services.authService.loginUser(newUserId, userAgentInfo);
          req.body = {
            data: { email, facebookId, firstName, lastName },
            tokens: newUserTokens
          };
          res.delegate(Project.BACKEND);
        } else {
          const userId = user.id;
          const tokens = services.authService.loginUser(userId, userAgentInfo);
          res.json(tokens);
        }
      }
    )
    .post(
      AuthApiPath.Login,
      authenticationMiddleware,
      wrap<Empty, Tokens, { id: string }, Empty>((req) => {
        const userId: string = (req.user as User).id;
        const userAgentInfo: string = req.headers['user-agent'];
        const result = services.authService.loginUser(userId, userAgentInfo);
        return Promise.resolve(result);
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
          return result;
        } catch {
          throw new CustomError(
            HttpStatusCode.UNAUTHORIZED,
            'Token is invalid'
          );
        }
      })
    )
    .post(
      AuthApiPath.TokenReject,
      wrap<Empty, void, { refreshToken: string }, Empty>(async (req) => {
        const { refreshToken } = req.body;
        await services.authService.deleteRefreshToken(refreshToken);
      })
    )
    .post(AuthApiPath.Register, registrationMiddleware, async (req, res) => {
      try {
        const newUser: User = await services.authService.registerUser(
          req.body.email,
          req.body.password
        );
        const userId: string = newUser.id;
        const userAgentInfo: string = req.headers['user-agent'];
        const tokens: Tokens = services.authService.loginUser(
          userId,
          userAgentInfo
        );
        req.body = { data: req.body, tokens };
        res.delegate(Project.BACKEND);
      } catch {
        throw new CustomError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'User is not created'
        );
      }
    });
};

export default init;
