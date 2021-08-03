import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { env } from '../env';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt.secret
};

passport.use(
  'login',
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    console.log(email, password);
    return done(null, {
    balance: "-3.7",
    createdAt: "2021-07-30T11:43:50.713Z",
    deletedAt: null,
    description: "Adipisicing",
    email: "mckeeodom@snacktion.com",
    firstName: "Mckee",
    id: "ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529",
    lastLoginDate: "2021-07-28T13:17:48.000Z",
    lastName: "Odom",
    phoneNumber: "+1 (833) 480-3912",
    region: "Niue",
    });
  })
);

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  done(null, jwtPayload);
}));
