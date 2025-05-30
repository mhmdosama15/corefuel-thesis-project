import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Metrics from "../model/metrics.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "../config/notification.js";

const __dirname = path.resolve();
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }
    user.isVerified = true;
    await user.save();
    return res
      .status(200)
      .json({ message: "Email verified successfully", user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmailToken = async (req) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return { status: 404, message: "User not found" };
    }
    const verifyEmailToken = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const FRONTEND_URL = process.env.FRONTEND_URL;

    const verifyEmailLink = `${FRONTEND_URL}/verify-email/${verifyEmailToken}`;

    const templatePath = path.join(
      __dirname,
      "emailTemplates/verify-email.html"
    );

    let htmlContent;
    try {
      htmlContent = fs.readFileSync(templatePath, "utf-8");
    } catch (error) {
      console.log("Error reading template file", error);
      return { status: 500, message: "Internal Server Error" };
    }
    htmlContent = htmlContent
      .replace("{{firstName}}", user.firstName)
      .replace("{{verificationLink}}", verifyEmailLink)
      .replace(/{{APP_NAME}}/g, process.env.APP_NAME);

    await sendEmail(user.email, "Verify your email", htmlContent);
    return { status: 200, message: "Verification email sent" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Internal Server Error" };
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const emailResponse = await verifyEmailToken(req);
    if (emailResponse.status !== 200) {
      return res.status(emailResponse.status).json(emailResponse.message);
    }
    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// request reset password
export const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const FRONTEND_URL = process.env.FRONTEND_URL;
    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;

    const templatePath = path.join(
      __dirname,
      "emailTemplates/password-reset.html"
    );

    let htmlContent;
    try {
      htmlContent = fs.readFileSync(templatePath, "utf-8");
    } catch (err) {
      console.error("Error reading template file:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    htmlContent = htmlContent
      .replace("{{firstName}}", user.firstName)
      .replace("{{resetLink}}", resetLink)
      .replace(/{{APP_NAME}}/g, process.env.APP_NAME);

    await sendEmail(user.email, "Password Reset", htmlContent);
    return res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// resetPassword
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

    // comparing passwords
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // verifying token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;

    await user.save();
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, username, email, password, metricsData } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (!password || password.length < 10) {
      return res
        .status(400)
        .json({ message: "Password must be at least 10 characters long" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const newMetrics = new Metrics({
      userId: newUser._id,
      ...metricsData,
    });
    await newMetrics.save();
    newUser.metrics = newMetrics._id;
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   // secure: true,
    //   sameSite: "none",
    // });
    const emailResponse = await verifyEmailToken(req);
    if (emailResponse.status !== 200) {
      return res
        .status(emailResponse.status)
        .json({ message: emailResponse.message, token, user: newUser });
    }
    return res
      .status(201)
      .json({ message: "User created successfully", token, user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const addUsername = async (req, res) => {
  try {
    const userId = req.userId;
    const { username } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.username = username;
    await user.save();
    return res.status(200).json({ message: "Username added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding username" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   // secure: true,
    //   sameSite: "none",
    // });
    return res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

// verify user
export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = verifiedToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error authenticating user" });
  }
};
