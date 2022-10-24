const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('@config/Auth');
const User = require('@modules/User/models/User');

module.exports = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    passReqToCallback: true,
  },
  async (request, jwt_payload, done) => {
    const exists = await User.findOne({ _id: jwt_payload.sub });
    if (!exists) return done(null, false, { message: 'login required' });

    return done(null, exists);
  },
);
