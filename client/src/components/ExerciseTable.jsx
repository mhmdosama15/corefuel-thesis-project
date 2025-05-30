import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserExercises } from "../redux/userSlice";
import { Link, useLocation } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BACKEND_URL } from "../utils";
import axios from "axios";
const ExerciseTable = () => {
  const dispatch = useDispatch();
  const [exercises, setExercises] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const getUserExercises = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/get-exercises`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setExercises(response.data.userExercises);
        dispatch(setUserExercises(response.data.userExercises));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteExercise = async (exerciseId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/delete-exercise`,
        {
          exerciseId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        getUserExercises();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserExercises();
  }, []);
  return (
    <div className="w-full overflow-scroll hide-scrollbar">
      <table className="w-full border-collapse border border-gray-900">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border px-4 py-2"></th>
            <th className="border px-4 py-2">Exercise Name</th>
            <th className="border px-4 py-2">Exercise Type</th>
            <th className="border px-4 py-2">Sets</th>
            <th className="border px-4 py-2">Reps</th>
    
            {!isDashboard && <th className="border px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {exercises.length > 0 ? (
            exercises.map((exercise, index) => (
              <tr key={index} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{exercise.exerciseName}</td>
                <td className="border px-4 py-2">{exercise.exerciseType}</td>
                <td className="border px-4 py-2"> {exercise.sets}</td>
                <td className="border px-4 py-2"> {exercise.reps}</td>
              
                {/* <td className="border px-4 py-2">
            {new Date(exercise.createdAt).toLocaleDateString()}
          </td> */}
                {!isDashboard && (
                  <td className="border flex items-center justify-center gap-2 py-2">
                    <Link
                      to={`/exercise/edit/${exercise._id}`}
                      state={{ exercise }}
                    >
                      <FaEdit className="text-xl" />
                    </Link>
                    <button onClick={() => deleteExercise(exercise._id)}>
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={isDashboard ? 5 : 6}
                className="border px-4 py-2 text-center"
              >
                You have no exercises yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExerciseTable;
