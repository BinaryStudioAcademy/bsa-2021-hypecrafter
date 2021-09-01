import passport from 'passport';

const facebookAuth = passport.authenticate('facebook-token', { session: false });

export { facebookAuth };
