const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req, res) => {
  const { username } = req.body;
  const newUser = new User({ username });

  try {
    await newUser.save();
    res.json('New user added !');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
