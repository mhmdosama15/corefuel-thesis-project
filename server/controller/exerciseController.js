import Exercise from "../model/exercise.js";
import Note from "../model/note.js";
import User from "../model/user.js";
import Video from "../model/video.js";

export const createExercise = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { exerciseName, exerciseType, sets, reps } =
      req.body;

    const exercise = new Exercise({
      userId,
      exerciseName,
      exerciseType,
      sets,
      reps,
      
    });

    await exercise.save();
    return res.status(200).json({ message: "Exercise added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error adding exercise" });
  }
};

export const updateExercise = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }
    const { id } = req.params;
    const exercise = await Exercise.findById(id);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    const { exerciseName, exerciseType, sets } =
      req.body;
    exercise.exerciseName = exerciseName;
    exercise.exerciseType = exerciseType;
    exercise.sets = sets;
    exercise.reps = reps;

    await exercise.save();
    return res
      .status(200)
      .json({ message: "Exercise updated successfully", exercise });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error updating exercise" });
  }
};
export const getUserExercises = async (req, res) => {
  try {
    const userId = req.userId;
    const userExercises = await Exercise.find({ userId });

    if (!userExercises) {
      return res.status(404).json({ message: "User exercises not found" });
    }
    return res.status(200).json({ message: "Authenticated", userExercises });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};
export const deleteExercise = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { exerciseId } = req.body;
    const exercise = await Exercise.findOneAndDelete({ _id: exerciseId });
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found" });
    }
    return res.status(200).json({ message: "Exercise deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting exercise" });
  }
};

export const getExerciseVideos = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { category } = req.params;

    const exercisevideos = await Video.find({ category });
    if (!exercisevideos) {
      return res.status(404).json({ message: "User food not found" });
    }

    return res.status(200).json({ message: "Authenticated", exercisevideos });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting user data" });
  }
};

export const searchExercise = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { title } = req.body;
    const search = await Video.find({ title: title });
    if (!search) {
      return res.status(404).json({ message: "No search results found" });
    }
    return res.status(200).json({ message: "Found exercise", search });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error searching exercise" });
  }
};

export const addExerciseNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.body;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    let note = await Note.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (note) {
      // Update existing note
      note.content = content;
      await note.save();
    } else {
      // Create new note
      note = new Note({
        userId,
        content,
        date: new Date(),
      });
      await note.save();
    }

    return res.json({ message: "Note saved successfully", note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getExerciseNote = async (req, res) => {
  try {
    const { userId } = req;
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const note = await Note.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    return res.json({ message: "Note fetched successfully", note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
