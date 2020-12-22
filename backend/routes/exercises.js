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

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  try {
    const exercise = await Exercise.findById(id);
    res.json(exercise);
  } catch (err) {
    console.log(res.status(400).json('Error: ' + err));
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  try {
    await Exercise.findByIdAndDelete(id);
    res.json('Exercise Deleted');
  } catch (err) {
    console.log(res.status(400).json('Error: ' + err));
  }
});

router.route('/update/:id').post(async (req, res) => {
  const { id } = req.params;
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  try {
    const exercise = await Exercise.findById(id);
    exercise.username = username;
    exercise.description = description;
    exercise.duration = duration;
    exercise.date = date;

    exercise
      .save()
      .then(() => res.json('Exercise Updated'))
      .catch((err) => res.status(400).json('Error: ' + err));
  } catch (err) {
    console.log(res.status(400).json('Error: ' + err));
  }
});

module.exports = router;
