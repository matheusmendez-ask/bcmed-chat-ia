const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');

const serverUrl =
  process.env.NODE_ENV === 'production' ? process.env.SERVER_URL_PROD : process.env.SERVER_URL_DEV;

const findOrCreateUser = async (profile, cb) => {
  try {
    const oldUser = await User.findOne({ email: profile.emails[0].value });
    if (oldUser) {
      return cb(null, oldUser);
    }
    const newUser = await new User({
      provider: 'google',
      googleId: profile.id,
      username: profile.name.givenName,
      email: profile.emails[0].value,
      emailVerified: profile.emails[0].verified,
      name: `${profile.name.givenName} ${profile.name.familyName}`,
      avatar: profile.photos[0].value
    }).save();
    cb(null, newUser);
  } catch (err) {
    console.error(`Error finding or creating user: ${err.message}`);
    cb(err);
  }
};

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverUrl}${process.env.GOOGLE_CALLBACK_URL}`,
    proxy: true
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      await findOrCreateUser(profile, cb);
    } catch (err) {
      console.error(`Error authenticating user: ${err.message}`);
      cb(err);
    }
  }
);

passport.use(googleLogin);
