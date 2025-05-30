import {
  calculateBMR,
  calculateDailyGoals,
  calculateTDEE,
  getCalorieIntake,
} from "../helper.js";
import Metrics from "../model/metrics.js";
import User from "../model/user.js";

export const updateMetrics = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Metrics.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { metricsData } = req.body;

    const updatedData = {
      ...metricsData,
    };
    const updatedMetrics = await Metrics.findOneAndUpdate(
      { userId: userId },
      updatedData,
      { new: true }
    );
    if (!updatedMetrics) {
      return res.status(404).json({ message: "User metrics not found" });
    }
    return res.status(200).json({
      message: "Metrics Updated successfully",
      metrics: updatedMetrics,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const generateUserCalories = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userWithMetrics = await user.populate("metrics");
    const metrics = userWithMetrics.metrics;

    if (!metrics) {
      return res.status(400).json({ message: "User metrics not found" });
    }

    // Calculate user age from dob
    const dob = new Date(metrics.dob);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();

    const isBirthdayPassed =
      today.getMonth() > dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

    if (!isBirthdayPassed) {
      age--;
    }

    const BMR = calculateBMR(
      metrics.gender,
      metrics.weight,
      metrics.height,
      age
    );
    const TDEE = calculateTDEE(BMR, metrics.activityLevel);
    if (
      !metrics.goals ||
      !Array.isArray(metrics.goals) ||
      metrics.goals.length === 0
    ) {
      return res.status(400).json({ message: "User has no goals set" });
    }

    const calorieTarget = getCalorieIntake(metrics.goals[0], TDEE);
    const dailyGoals = calculateDailyGoals(calorieTarget, metrics.weight);

    return res.status(200).json({
      message: "Calories and goals generated",
      calorieTarget,
      dailyGoals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error generating calories" });
  }
};
