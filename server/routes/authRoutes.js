import express from "express";
import {
  addUsername,
  createUser,
  loginUser,
  requestResetPassword,
  resendVerificationEmail,
  resetPassword,
  verifyEmail,
  verifyUser,
} from "../controller/authController.js";
import { getUserData, updateUserData } from "../controller/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.patch("/add-username", verifyUser, addUsername);
router.post("/login", loginUser);
router.patch("/update", verifyUser, updateUserData);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);
router.post("/request-reset-password", requestResetPassword);
router.post("/reset-password", resetPassword);
// user
router.get("/", verifyUser, getUserData);
export default router;
