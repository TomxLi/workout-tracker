const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [{
      type: {
        type: String,
        trim: true,
        required: 'exercise field cannot be blank.'
      },
      name: {
        type: String,
        required: 'enter a name for exercise.'
      },
      duration: {
        type: Number
      },
      weight: {
        type: Number
      },
      reps: {
        type: Number
      },
      sets: {
        type: Number
      },
      distance: {
        type: Number
      }
    }]
  }, {
    toJSON: {virtuals: true}
});

WorkoutSchema.virtual( "totalDuration" ).get(function () {
    return this.exercises.reduce(( sum, exercise ) => {
        return sum + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;