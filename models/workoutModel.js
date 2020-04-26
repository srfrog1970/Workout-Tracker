// Change the name of the file and use
// 'mod'
// mod - Mongoose Module
// mod - Mysql Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercise", // reference the name of the document.
    },
  ],
});
// Declare the model
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
