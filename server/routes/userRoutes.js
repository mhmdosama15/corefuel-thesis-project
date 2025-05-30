import express from "express";
import { verifyUser } from "../controller/authController.js";
import { getMotivationalQuote } from "../controller/userController.js";
import {
  generateUserCalories,
  updateMetrics,
} from "../controller/metricsController.js";
import {
  addExerciseNote,
  createExercise,
  deleteExercise,
  getExerciseNote,
  getExerciseVideos,
  getUserExercises,
  searchExercise,
  updateExercise,
} from "../controller/exerciseController.js";
import {
  deleteFood,
  getUserFood,
  saveFood,
  searchFood,
} from "../controller/foodController.js";

const router = express.Router();

router.post("/motivational-quote", verifyUser, getMotivationalQuote);
router.post("/add-exercise", verifyUser, createExercise);
router.patch("/edit-exercise/:id", verifyUser, updateExercise);
router.post("/delete-exercise", verifyUser, deleteExercise);
router.get("/get-exercises", verifyUser, getUserExercises);
router.post("/search-food", verifyUser, searchFood);
router.post("/save-food", verifyUser, saveFood);
router.get("/get-user-food", verifyUser, getUserFood);
router.get("/get-exercises/:category", verifyUser, getExerciseVideos);
router.post("/search-exercise", verifyUser, searchExercise);
router.get("/get-calories", verifyUser, generateUserCalories);
router.post("/delete-food", verifyUser, deleteFood);
router.post("/save-exercise-note", verifyUser, addExerciseNote);
router.get("/get-exercise-notes", verifyUser, getExerciseNote);
router.patch("/update-metrics", verifyUser, updateMetrics);

export default router;
