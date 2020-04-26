const router = require("express").Router();
const db = require("../models/indexModel");

router.post("/api/exercise", (req, res) => {
  db.Exercise.insertMany(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

router.post("/api/workouts", (req, res) => {
  // Insert the workout
  workoutdata = { day: new Date() };
  db.Workout.insertMany(workoutdata)
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});

router.put("/api/workouts/:id", async (req, res) => {
  await db.Exercise.insertMany(req.body).then(async (dbexercise) => {
    // Find the workout and push the array of exercise ids.
    await db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          exercises: dbexercise.map((element, key) => element._id),
        },
      },
      // TODO: Not sure what this does
      { new: true }
    )
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.find({}) // Collection (Table) and query type
    .limit()
    .sort({ day: "asc" })
    .populate({ path: "exercises", model: "Exercise" })
    .exec()
    .then(function (docs, err) {
      if (err) {
        return res.json(err);
      }
      return res.json(docs);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({
    day: { $gte: new Date().setDate(new Date().getDate() - 7) },
  }) // Collection (Table) and query type
    .limit()
    .sort({ day: "asc" })
    .populate({ path: "exercises", model: "Exercise" })
    .exec()
    .then(function (docs, err) {
      if (err) {
        return res.json(err);
      }
      return res.json(docs);
    });
});

router.get("/api/exercise", (req, res) => {
  db.Exercise.find({}) // Collection (Table) and query type
    .sort({})
    .populate() //Set up to populate a child
    .exec() // Execute the query
    .then((dbDoc) => {
      res.json(dbDoc);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/api/delete/exercise", (req, res) => {
  db.Exercise.deleteMany({}, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send(response);
    }
  });
});
//
//TODO: How would I delete the Collection of Workouts at the same time?
//
router.delete("/api/delete/workout", (req, res) => {
  db.Workout.remove({}, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res.send(response);
    }
  });
});

module.exports = router;
