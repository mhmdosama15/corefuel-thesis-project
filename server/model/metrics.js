import mongoose from "mongoose";

const metricsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    goals: {
      type: [String],
      required: true,
    },
    struggles: {
      type: [String],
      required: true,
    },
    splitType: {
      type: String,
      required: true,
    },
    phase: {
      type: String,
      required: true,
    },
    activityLevel: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    goalWeight: {
      type: Number,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    // age: {
    //   type: Number,
    //   required: true,
    // },
    gender: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Metrics = mongoose.model("metrics", metricsSchema);
export default Metrics;
