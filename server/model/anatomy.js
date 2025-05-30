import mongoose, { mongo, Mongoose } from "mongoose";

const anatomySchema = new mongoose.Schema(
  {
    anatomyName: {
      type: String,
      required: true,
    },
    anatomyType: {
      type: String,
      required: true,
    },
    anatomyGroups: [
      {
        groupName: { type: String, required: true },
        exercises: [
          {
            exerciseName: { type: String, required: true },
            exerciseVideo: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "video",
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Anatomy = mongoose.model("anatomy", anatomySchema);
export default Anatomy;
