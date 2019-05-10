const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config')
const {
  check,
  validationResult
} = require('express-validator/check');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// @route   GET api
// @desc    Get 
// @access  Public
// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password')
//     res.json(user)
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Unexpected error')
//   }
// });


// @route   POST api/auth
// @desc    Login
// @access  Public
router.post('/', [
    check('email', 'Email required').isEmail(),
    check('password', 'Password required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      //bad request
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      name,
      email,
      password
    } = req.body

    try {
      let user = await User.findOne({
        email //same as email:email
      });
      if (!user) {
        return res.status(400).json({
          errors: [{
            msg: 'Invalid credentials'
          }]
        });
      }

      const isPassword = await bcrypt.compare(password, user.password)

      if (!isPassword) {
        return res.status(400).json({
          errors: [{
            msg: 'Invalid credentials'
          }]
        });
      }

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      }, (err, token) => {
        if (err) {
          throw err;
        }
        res.json({
          token
        });
      });
    } catch (err) {
      console.log(err)
      return res.status(500).send('Unexpected error')
    }
  });



module.exports = router;