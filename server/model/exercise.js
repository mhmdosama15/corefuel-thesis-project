import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    exerciseName: {
      type: String,
      required: true,
    },
    exerciseType: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    // caloriesBurned: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("exercise", exerciseSchema);
export default Exercise;
