const express = require('express');
const router = express.Router();
const {
  check,
  validationResult
} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
// @route   GET api/profile/me
// @desc    Get user profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({
        msg: 'Invalid user'
      });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Unexpected error.')
  }
});

// @route   POST api/profile
// @desc    Create/update user profile
// @access  Private
router.post('/', [auth, [check('status', 'Status is required.').not().isEmpty(), check('courses', 'Courses is required.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      website,
      location,
      bio,
      status,
      courses,
      youtube,
      twitter,
      instagram,
      linkedin
    } = req.body;

    const profileFields = {}
    profileFields.user = req.user.id;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (courses) {
      profileFields.courses = courses.split(',').map(course => course.trim());
    }

    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      })
      if (profile) {
        profile = await Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        });

        return res.json(profile)
      }

      profile = new Profile(profileFields);
      await profile.save();
      return res.json(profile)

    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Unexpected error.')
    }

  });

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Unexpected error.');
  }

});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({
        msg: 'Invalid user.'
      })
    }
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'Invalid user.'
      })
    }
    return res.status(500).send('Unexpected error.');
  }

});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [auth,
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      profile.experience.unshift(newExp);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Unexpected error')
    }

  });

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [auth,
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const {
      degree,
      school,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;
    const newEd = {
      degree,
      school,
      fieldOfStudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      });
      profile.education.unshift(newEd);
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Unexpected error')
    }

  });

// @route   DELETE api/profile
// @desc    Delete profile, users and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await Profile.findOneAndRemove({
      user: req.params.user_id
    })
    await User.findOneAndRemove({
      _id: req.params.user_id
    })
    return res.json({
      msg: 'User deleted'
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Unexpected error.');
  }

});

// @route   DELETE api/profile/experience/:experience_id
// @desc    Delete experience
// @access  Private
router.delete('/experience/:experience_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.experience_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile)
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'Invalid experience.'
      })
    }
    return res.status(500).send('Unexpected error.');
  }

});

// @route   DELETE api/profile/education/:education_id
// @desc    Delete education
// @access  Private
router.delete('/education/:education_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.education_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    return res.json(profile)
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({
        msg: 'Invalid education.'
      })
    }
    return res.status(500).send('Unexpected error.');
  }

});
module.exports = router;