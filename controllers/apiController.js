const router = require("express").Router();
const db = require("../models/indexModel");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ day: "asc" })
    .populate("Exercise")
    .exec()
    .then((dbExercises) => {
      res.json(dbExercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/api/workouts", (req, res) => {
  db.Workout.findOneAndUpdate(
    {
      day: Date().setDate(new Date().getDate()),
    },
    { $push: { res } },
    { new: true }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
