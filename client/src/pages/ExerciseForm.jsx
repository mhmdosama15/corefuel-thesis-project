import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const ExerciseForm = () => {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseType, setExerciseType] = useState("cardio");
  const [sets,setSets] = useState("0");
  const [reps,setReps] = useState("0");
  const [isEditData, setIsEditData] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const exercise = location.state?.exercise;
  useEffect(() => {
    if (exercise) {
      console.log(exercise);
      setIsEditData(true);
      setExerciseName(exercise.exerciseName);
      setExerciseType(exercise.exerciseType);
      setSets(exercise.sets);
      setReps(exercise.reps);
      
    }
  }, [exercise]);
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("data sent", {
      exerciseName,
      exerciseType,
      sets,
      reps,
      
    });
    if (isEditData) {
      try {
        const response = await axios.patch(
          `${BACKEND_URL}/api/user/edit-exercise/${id}`,
          {
            exerciseName,
            exerciseType,
            sets,
            reps,
            
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);
        if (response.status === 200) {
          navigate("/exercise");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/user/add-exercise`,
          {
            exerciseName,
            exerciseType,
            sets,
            reps,
            
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response.data);
        if (response.status === 200) {
          setExerciseName("");
          setExerciseType("cardio");
          setSets(0);
          setReps(0);
          navigate("/exercise");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex flex-col px-6 lg:px-30 pb-10 lg:pb-30 gap-6  pt-10 lg:pt-24">
      <h2>Create New Exercise</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row lg:justify-between xl:w-3/4 gap-10  p-6 bg-white shadow-sm border border-[#dadada] rounded"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <label htmlFor="exercise-name" className="text-lg font-bold">
              Exercise Name:
            </label>
            <input
              id="exercise-name"
              className="bg-white border border-[#dadada] rounded w-72  px-4 py-2"
              type="text"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="exercise type" className="text-lg font-bold">
              Exercise type:
            </label>
            <select
              id="exercise-type"
              className="bg-white border border-[#dadada] rounded w-72  px-4 py-2"
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              required
            >
              <option value={"cardio"}>Cardio</option>
              <option value={"strength"}>Strength</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="sets" className="text-lg font-bold">
              Number of sets:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="sets"
                type="number"
                className="bg-white border border-[#dadada] rounded  px-4 py-2"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                required
              />
              <span>Sets</span>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="reps" className="text-lg font-bold">
                Number of reps:
              </label>
              <div className="flex items-center gap-2">
              <input
              id="reps"
              type="number"
              className="bg-white border border-[#dadada] rounded  px-4 py-2"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
              />
              <span>Reps</span>
              </div>
            </div>
          </div>
        {/* <div className="flex flex-col gap-3">
            <label htmlFor="calories" className="text-lg font-bold">
              Calories Burned:
            </label>
            <div className="flex items-center gap-2">
              <input
                id="calories"
                type="number"
                className="bg-white border border-[#dadada] rounded  px-4 py-2"
                value={caloriesBurned}
                onChange={(e) => setCaloriesBurned(e.target.value)}
              />
              <span>kcal</span>
            </div>
          </div> */}
          <button
            type="submit"
            disabled={loading}
            className="px-4 mt-6 py-2 rounded bg-blue-500 text-white w-32"
          >
            Add
          </button>
        </div>
        <div className="flex order-first lg:order-none flex-col gap-2">
          {" "}
          <h2 className="font-bold">Creating a new exercise</h2>
          <p>
            If you can't find an exercise in our database, you can easily add it
            yourself.
          </p>
          <p>
            Once you've created an exercise, you will be able to search for it
            and add it to your exercise log at any time.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ExerciseForm;
