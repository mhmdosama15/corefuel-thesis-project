import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 10,
    },
    foodCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    metrics: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "metrics",
      required: false,
    },
    exerciseCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "exercise",
      required: false,
    },
    lastQuoteGeneratedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
