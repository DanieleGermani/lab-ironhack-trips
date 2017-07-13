const passport = require('passport');
const FbStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const path           = require("path");
var debug = require('debug')('travel-diaries:'+path.basename(__filename));

passport.use(new FbStrategy({
  clientID: "1869005866754754",
  clientSecret: "de3442abcf6b8fccf907593e29dbf0ac",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });

}));
