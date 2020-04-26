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

router.post("/api/workout", (req, res) => {
  db.Workout.insertMany(req.body, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
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

router.post("/api/exercise/:id", (req, res) => {
  db.Exercise.findOneAndUpdate(
    { _id: db.ObjectId(req.params.id) },
    req.body,
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

// function queryDatabase(day, exercisesArray){

//   .then(() => db.Workout.collection.insert(day))
//   .then(() => db.Exercise.collection.insertMany(exercisesArray))
//   .then(dbExercises => {
//     return db.Workout.findOneAndUpdate({}, { $push: { exercises: dbExercises.ops.map((element, key) => element._id)}},
//     { new: true })
//   })
//   // findOneAndUpdate the Workout document with the ObjectIds of the exercises we just created
//   .then(data => {
//     console.log('WORKOUT: ', data)
//     // console.log(data.result.n + " records inserted!");
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
// }

module.exports = router;
