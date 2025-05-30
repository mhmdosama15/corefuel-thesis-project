import { generateMotivationalQuote } from "../api.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import { verifyEmailToken } from "./authController.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userMetrics = await user.populate("metrics");
    const metrics = userMetrics.metrics;
    return res.status(200).json({ message: "Authenticated", metrics, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const getMotivationalQuote = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { goal, phase, activityLevel, struggle } = req.body;
  const now = new Date();
  const lastGenerated = user.lastQuoteGeneratedAt;

  const minutesDiff = lastGenerated ? (now - lastGenerated) / (1000 * 60) : 11;

  if (lastGenerated && minutesDiff < 10) {
    return res
      .status(429)
      .json({ message: "Quote already generated in the last 10 minutes" });
  }

  try {
    const result = await generateMotivationalQuote(
      goal,
      phase,
      struggle,
      activityLevel
    );

    user.lastQuoteGeneratedAt = now;
    await user.save();

    return res
      .status(200)
      .json({ message: "Motivational quote generated successfully", result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error generating motivational quote" });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { username, email, password } = req.body;
    if (email) {
      const existingUser = await User.findOne({ email: email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    let hashPassword;
    if (password) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      hashPassword = await bcrypt.hash(password, salt);
    }
    const updatedData = {
      ...(username && { username }),
      ...(email && { email, isVerified: false }),
      ...(password && { password: hashPassword }),
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found", updatedUser });
    }
    if (email) {
      const emailResponse = await verifyEmailToken(req);
      if (emailResponse.status !== 200) {
        return res
          .status(emailResponse.status)
          .json({ message: emailResponse.message });
      }
    }

    return res
      .status(200)
      .json({ message: "User data updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
