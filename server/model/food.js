import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },
    foodCategory: {
      type: [String],
      required: true,
    },
    foodMacros: {
      calories: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fats: { type: Number, required: true },
      sodium: { type: Number, required: true },
      sugar: { type: Number, required: true },
      protein: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Food = mongoose.model("food", foodSchema);
export default Food;
