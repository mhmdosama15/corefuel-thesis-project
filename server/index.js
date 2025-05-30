import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import Video from "./model/video.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();
/* Core
Plank (Abs)
Setup: Begin by positioning yourself face down on the floor. Place your forearms on the ground with your elbows directly below your shoulders. Keep your feet together and your body in a straight line from head to heels.
Starting Position: Engage your core and keep your body as straight as possible, maintaining a neutral neck position. Do not let your hips sag or pike upwards.
Plank: Hold the position by keeping your core tight, glutes engaged, and your back straight. Ensure your weight is evenly distributed between your forearms and toes.
Hold: Hold for the desired amount of time, maintaining the plank position.
Repeat: Breathe steadily and maintain the plank position for the entire duration.
Tip: Focus on engaging the entire core, especially the lower abs, to prevent sagging in your lower back. Keep your body in a straight line, and do not allow your head to drop or tilt.




V-Ups (Abs, Hip Flexors)
https://drive.google.com/file/d/1epKfOtzu8j6k0K28jA3IlwPzom3SMqw1/view?usp=sharing
Setup: Lie flat on your back with your arms extended overhead and legs straight. Ensure your lower back is pressed into the floor.
Starting Position: Engage your core, keeping your legs straight and your arms extended.
V-Up: Simultaneously raise your legs and torso off the floor, reaching your hands towards your feet. Aim to form a “V” shape with your body, keeping your legs and arms extended.
Return: Lower your torso and legs back to the starting position in a controlled manner.
Repeat: Maintain steady breathing and repeat for the desired reps.
Tip: Focus on controlled movement rather than speed, and avoid swinging your legs. Engage your core to perform the movement, rather than relying on momentum.


Knee to Elbow (Abs, Obliques)
https://drive.google.com/file/d/1i4ETszBs8oAx69WqlUJSbzNE57JBLUTG/view?usp=sharing
Knee to Elbow
Setup: Begin by positioning yourself in a forearm plank position with your body in a straight line. Your forearms should be on the floor, elbows directly under your shoulders.
Starting Position: Keep your core engaged and body straight. Your feet should be slightly apart.
Knee to Elbow: Bring your right knee towards your left elbow, twisting your torso slightly as you crunch through your obliques.
Return: Slowly return to the plank position and repeat on the opposite side.
Repeat: Maintain steady breathing and repeat the movement for the desired reps, alternating sides.
Tip: Focus on squeezing your obliques when bringing your knee towards your elbow. Keep your core engaged throughout the entire movement and avoid letting your hips sag.


*/
const videoData = [
  {
    title: "Plank",
    videoUrlID: "1gSdnc9Lxjs-0GNWe7CXkl7uNDCwh34Jz", 
    description:
      "Setup: Begin by positioning yourself face down on the floor. Place your forearms on the ground with your elbows directly below your shoulders. Keep your feet together and your body in a straight line from head to heels. Starting Position: Engage your core and keep your body as straight as possible, maintaining a neutral neck position. Do not let your hips sag or pike upwards. Plank: Hold the position by keeping your core tight, glutes engaged, and your back straight. Ensure your weight is evenly distributed between your forearms and toes. Hold: Hold for the desired amount of time, maintaining the plank position. Repeat: Breathe steadily and maintain the plank position for the entire duration. Tip: Focus on engaging the entire core, especially the lower abs, to prevent sagging in your lower back. Keep your body in a straight line, and do not allow your head to drop or tilt.",
    category: "core",
    subCategory: "abs",
  },
  {
    title: "V-Ups",
    videoUrlID: "1epKfOtzu8j6k0K28jA3IlwPzom3SMqw1", 
    description:
      "Setup: Lie flat on your back with your arms extended overhead and legs straight. Ensure your lower back is pressed into the floor. Starting Position: Engage your core, keeping your legs straight and your arms extended. V-Up: Simultaneously raise your legs and torso off the floor, reaching your hands towards your feet. Aim to form a 'V' shape with your body, keeping your legs and arms extended. Return: Lower your torso and legs back to the starting position in a controlled manner. Repeat: Maintain steady breathing and repeat for the desired reps. Tip: Focus on controlled movement rather than speed, and avoid swinging your legs. Engage your core to perform the movement, rather than relying on momentum.",
    category: "core",
    subCategory: "abs, hip flexors",
  },
  {
    title: "Knee to Elbow",
    videoUrlID: "1i4ETszBs8oAx69WqlUJSbzNE57JBLUTG", 
    description:
      "Setup: Begin by positioning yourself in a forearm plank position with your body in a straight line. Your forearms should be on the floor, elbows directly under your shoulders. Starting Position: Keep your core engaged and body straight. Your feet should be slightly apart. Knee to Elbow: Bring your right knee towards your left elbow, twisting your torso slightly as you crunch through your obliques. Return: Slowly return to the plank position and repeat on the opposite side. Repeat: Maintain steady breathing and repeat the movement for the desired reps, alternating sides. Tip: Focus on squeezing your obliques when bringing your knee towards your elbow. Keep your core engaged throughout the entire movement and avoid letting your hips sag.",
    category: "core",
    subCategory: "abs, obliques",
  },
];


const testData = async () => {
  try {
    await Video.insertMany(videoData);
    console.log("Data inserted successfully");
  } catch (error) {
    console.log(error);
  }
};

  // testData();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
