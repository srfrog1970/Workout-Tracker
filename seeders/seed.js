let mongoose = require("mongoose");
let db = require("../models/indexModel");
mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});
const workoutDay1 = {
  day: new Date().setDate(new Date().getDate() - 1),
};
const workoutDay2 = {
  day: new Date().setDate(new Date().getDate() - 2),
};
const workoutDay3 = {
  day: new Date().setDate(new Date().getDate() - 3),
};
const exercisesDay1 = [
  {
    type: "resistance",
    name: "Bicep Curl",
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4,
  },
  {
    type: "resistance",
    name: "Push Press",
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4,
  },
  {
    type: "cardio",
    name: "jog",
    duration: 30,
    distance: 2,
  },
];
const exercisesDay2 = [
  {
    type: "resistance",
    name: "Bicep Curl",
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4,
  },
  {
    type: "resistance",
    name: "Push Press",
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4,
  },
  {
    type: "resistance",
    name: "Bench",
    duration: 30,
    distance: 2,
  },
];
const exercisesDay3 = [
  {
    type: "resistance",
    name: "Bicep Curl",
    duration: 20,
    weight: 100,
    reps: 10,
    sets: 4,
  },
  {
    type: "resistance",
    name: "Push Press",
    duration: 25,
    weight: 185,
    reps: 8,
    sets: 4,
  },
  {
    type: "resistance",
    name: "Bench",
    duration: 30,
    distance: 2,
  },
];
async function queryDatabase(workoutdata, exercisesArray) {
  // Insert the workout
  await db.Workout.insertMany(workoutdata);
  // insert the exercise with a callback function
  await db.Exercise.insertMany(exercisesArray).then(async (dbexercise) => {
    // Find the workout and push the array of exercise ids.
    await db.Workout.findOneAndUpdate(
      {
        day: workoutdata.day,
      },
      {
        $push: {
          exercises: dbexercise.map((element, key) => element._id),
        },
      },
      // TODO: Not sure what this does
      { new: true }
    ).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  });
}

async function initSeeds() {
  // TODO: I had to add a call back function or this would not work. It did not error out either?!?!?
  db.Workout.deleteMany({}, () => "");
  db.Exercise.deleteMany({}, () => "");
  await queryDatabase(workoutDay1, exercisesDay1);
  await queryDatabase(workoutDay2, exercisesDay2);
  await queryDatabase(workoutDay3, exercisesDay3);
  process.exit(0);
}
initSeeds();
