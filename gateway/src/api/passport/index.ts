// eslint-disable-next-line import/no-self-import
import passport from 'passport';
import { Express } from 'express';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { env } from '../../env';
import { Repositories } from '../../data/repositories';
import { cryptCompare } from '../../helpers/crypt';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt.secret
};

export function initPassport(app: Express, repositories: Repositories) {
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await repositories.userRepository.getByEmail(email);
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
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async ({ body: data }, email, _password, done) => {
        try {
          return (await repositories.userRepository.getByEmail(email))
            ? done({ status: 401, message: "Email is already taken." }, null)
            : done(null, { ...data, email });
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
