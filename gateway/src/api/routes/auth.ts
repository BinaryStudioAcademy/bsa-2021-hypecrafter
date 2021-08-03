import { RefreshToken } from "./../../data/entities/refreshToken";
import { Router } from "express";
import { Services } from "../../services/index";
import randtoken from "rand-token";
import { authentication as authenticationMiddleware } from "./../middlewares";
import { createToken } from "../../helpers/createToken";

const init = (services: Services) => {
  const router = Router();

  return router
    .post("/login", authenticationMiddleware, async (req, res) => {
      const userId: string = (req.user as any).id;
      const token: string = createToken(userId);
      const refreshToken: string = randtoken.uid(256);
      await services.refreshTokenService.create({
        token: refreshToken,
        userAgentInfo: "",
        userId,
      });
      res.json({ token: `JWT: ${token}`, refreshToken });
    })
    .post("/token", async (req, res) => {
      const { userId, refreshToken } = req.body;
      const userToken: RefreshToken =
        await services.refreshTokenService.getByUserId(userId);
      if (userToken && userToken.token === refreshToken) {
        const token: string = createToken(userId);
        res.json({ token: `JWT: ${token}` });
      } else {
        res.send(401);
      }
    })
    .post("/token/reject", async (req, res) => {
      const { refreshToken } = req.body;
      const tokenItem: RefreshToken =
        await services.refreshTokenService.getByToken(refreshToken);
      if (tokenItem) {
        await services.refreshTokenService.deleteByToken(refreshToken);
      }
      res.send(204);
    });
};

export default init;
