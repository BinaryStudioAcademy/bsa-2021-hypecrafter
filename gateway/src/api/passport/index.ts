/* eslint-disable import/no-self-import */
/* eslint-disable @typescript-eslint/naming-convention */
import { Express } from 'express';
import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Repositories } from '../../data/repositories';
import { env } from '../../env';
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
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async ({ body: data }, email, _password, done) => {
        try {
          return (await repositories.userRepository.getByEmail(email))
            ? done({ status: 401, message: 'Email is already taken.' }, null)
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

  passport.use(new FacebookTokenStrategy({
    clientID: env.auth.facebook.appId,
    clientSecret: env.auth.facebook.secret,
    fbGraphVersion: 'v3.0'
  }, ((_accessToken, _refreshToken, profile, done) => {
    const { id: facebookId, name, emails } = profile;
    const { givenName: firstName, familyName: lastName } = name;
    const email = emails[0].value;
    done(null, { facebookId, firstName, lastName, email });
  })));

  app.use(passport.initialize());
}
