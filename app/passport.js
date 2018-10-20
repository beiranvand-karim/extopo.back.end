
const passport = require('koa-passport');
const { Strategy } = require('passport-local');
const User = require('./models/user');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


passport.use('local', new Strategy({
  usernameField: 'userName',
  passwordField: 'passWord'
}, async (userName, passWord, done) => {
  try {
    const user = await User.findOne({ userName });
    if (!user) { return done(null, false); }

    try {
      const isMatch = await user.isValidPassword(passWord);

      if (!isMatch) { return done(null, false); }

      done(null, user);
    } catch (err) {
      done(err);
    }
  } catch (err) {
    return done(err);
  }
}));
