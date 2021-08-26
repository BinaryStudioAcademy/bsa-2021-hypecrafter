import passport from 'passport';

const facebook = passport.authenticate('facebook-token', { session: false });

export { facebook };
