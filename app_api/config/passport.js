const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

// configure passport to authenticate users by email
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  async (email, password, done) => {
    try {
      // find the user in mongodb
      const user = await User.findOne({
        email: email.toLowerCase().trim()
      });

      // reject invalid login credentials
      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'Invalid email or password.'
        });
      }

      // return the authenticated user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));