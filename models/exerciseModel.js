const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "Type is Required",
  },
  name: {
    type: String,
    trim: true,
    required: "Name is Required",
  },
  duration: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  sets: {
    type: Number,
  },
});

// Declare the model
const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
