const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// import models
const Freelancer = require('../models/freelancer');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      Freelancer.findOne({ email: email })
        .then(freelancer => {
          if (!freelancer) {
            console.log('incorrect user');
            return done(null, false);
          }
          bcrypt.compare(password, freelancer.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              console.log('login success');
              return done(null, freelancer);
            } else {
              console.log('incorrect password');
              return done(null, false);
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((freelancer, done) => {
    done(null, freelancer.id);
  });

  passport.deserializeUser((id, done) => {
    Freelancer.findById(id, (err, freelancer) => {
      done(err, freelancer);
    });
  });
};
