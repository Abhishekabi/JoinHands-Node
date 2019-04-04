const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../../helper/authenticate');

const Freelancer = require('../../models/freelancer');

// @type    - GET
// @route   - /api/profile
// @desc    - displays the user profile
// @access  - PUBLIC
router.get('/', ensureAuthenticated, (req, res) => {
  res.send('Login success');
});

module.exports = router;
