const router = require('express').Router();

let Exercise = require('../models/exercise.model');

router.route('/').get(async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post(async (req, res) => {
  console.log(req.body);
  const { username, description } = req.body;
  const date = Date.parse(req.body.date);
  const duration = Number(req.body.duration);

  const newExercise = new Exercise({ username, description, duration, date });

  try {
    await newExercise.save();
    res.json('Exercise added !');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
