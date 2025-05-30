import { getFoodInfo } from "../api.js";
import User from "../model/user.js";
import Food from "../model/food.js";
export const searchFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { query } = req.body;
    const food = await getFoodInfo(query);
    if (!food || food.length === 0) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({ message: "Authenticated", food });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const saveFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { foodData, foodType } = req.body;
    const calories = foodData.calories ? parseFloat(foodData.calories) : 0;
    const carbs = foodData.carbs
      ? parseFloat(foodData.carbs.replace(/[^\d.-]/g, ""))
      : 0;
    const fats = foodData.fats
      ? parseFloat(foodData.fats.replace(/[^\d.-]/g, ""))
      : 0;
    const sodium = foodData.sodium
      ? parseFloat(foodData.sodium.replace(/[^\d.-]/g, ""))
      : 0;
    const sugar = foodData.sugar
      ? parseFloat(foodData.sugar.replace(/[^\d.-]/g, ""))
      : 0;
    const protein = foodData.protein
      ? parseFloat(foodData.protein.replace(/[^\d.-]/g, ""))
      : 0;

    const newFood = new Food({
      userId,
      foodName: foodData.title,
      foodType: foodType,
      foodCategory: foodData.mealType,
      foodMacros: {
        calories: calories,
        carbs: carbs,
        fats: fats,
        sodium: sodium,
        sugar: sugar,
        protein: protein,
      },
    });
    await newFood.save();
    return res.status(200).json({ message: "Food saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error saving food" });
  }
};

export const getUserFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userFood = await Food.find({ userId });
    if (!userFood) {
      return res.status(404).json({ message: "User food not found" });
    }
    return res.status(200).json({ message: "Authenticated", userFood });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { foodId } = req.body;
    const food = await Food.findOneAndDelete({ _id: foodId });
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting food" });
  }
};
