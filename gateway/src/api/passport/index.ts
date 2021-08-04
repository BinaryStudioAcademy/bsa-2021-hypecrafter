import { Repositories } from "./../../data/repositories/index";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { env } from "../../env";
import { Express } from "express";
import { cryptCompare } from "../../helpers/crypt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt.secret,
};

export function initPassport(app: Express, _repositories: Repositories) {
  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await _repositories.userRepository.getByEmail(email);
          if (!user) {
            return done(null, false);
          }

          return (await cryptCompare(password, user.passwordHash))
            ? done(null, user)
            : done(null, false);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      done(null, jwtPayload);
    })
  );

  app.use(passport.initialize());
}
