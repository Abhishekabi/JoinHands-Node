const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../../helper/authenticate');

const Freelancer = require('../../models/freelancer');

// @type    - GET
// @route   - /api/auth/register
// @desc    - displays the registration form
// @access  - PUBLIC
router.get('/register', (req, res) => {
  res.render('register');
});

// @type    - POST
// @route   - /api/auth/register
// @desc    - for new freelancer registration
// @access  - PUBLIC
router.post('/register', (req, res) => {
  Freelancer.findOne({ email: req.body.email })
    .then(freelancer => {
      if (freelancer) {
        res.status(400).json({ emailerror: 'Email is already registered' });
      } else {
        const newFreelancer = new Freelancer({
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: req.body.password,
          works: req.body.works,
          officeaddr: req.body.officeaddr,
          experience: req.body.experience,
          cost: req.body.cost,
          contactnum: req.body.contactnum
        });
        // encrypt the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newFreelancer.password, salt, (err, hash) => {
            if (err) {
              console.log('Error : ' + err);
            } else {
              newFreelancer.password = hash;
              newFreelancer
                .save()
                .then(freelancer => res.json(freelancer))
                .catch(err => console.log('Error : ' + err));
            }
          });
        });
      }
    })
    .catch(err => console.log('Error : ' + err));
});

// @type    - GET
// @route   - /api/auth/login
// @desc    - displays the login form
// @access  - PUBLIC
router.get('/login', (req, res) => {
  res.render('login');
});

// @type    - POST
// @route   - /api/auth/login
// @desc    - for freelancer login
// @access  - PUBLIC
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/api/profile',
    failureRedirect: '/api/auth/login',
    failureFlash: false
  })(req, res, next);
});

module.exports = router;
