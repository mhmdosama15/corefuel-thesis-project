import React, { useState } from "react";
import { useSelector } from "react-redux";

const Calorie = () => {
  const [cardio, setCardio] = useState(0);
  const [workout, setWorkout] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(null);
  const dob = useSelector((state) => state.user.metrics?.dob);
  const dateOFBirth = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dateOFBirth.getFullYear();

  const isBirthdayPassed =
    today.getMonth() > dateOFBirth.getMonth() ||
    (today.getMonth() === dateOFBirth.getMonth() &&
      today.getDate() >= dateOFBirth.getDate());

  if (!isBirthdayPassed) {
    age--;
  }

  const calculateCalories = (e) => {
    e.preventDefault();

    // Adjusted MET values: Cardio (6 METs), Strength Training (4 METs)
    const cardioCalories = (6 * weight * (cardio / 60)).toFixed(2);
    const workoutCalories = (4 * weight * (workout / 60)).toFixed(2);

    // BMR Calculation (using height, weight, and age)
    // Mifflin-St Jeor Equation (including age factor)
    const bmr = (10 * weight + 6.25 * height - 5 * age + 5).toFixed(2); // Added age factor

    // Total Calories = Calories burned from exercise + BMR
    const totalCalories = (
      parseFloat(cardioCalories) +
      parseFloat(workoutCalories) +
      parseFloat(bmr)
    ).toFixed(2);

    setCaloriesBurned(totalCalories);
  };
  return (
    <div className="flex flex-col px-6 lg:px-30 pb-20 lg:pb-30 gap-6 pt-10 lg:pt-20">
      <div className="flex flex-col gap-8 items-center bg-white shadow-md border border-[#dadada] p-4 rounded">
        <h2 className="text-3xl font-bold">Calorie Calculator</h2>
        <form
          className="flex flex-col gap-6 p-6 w-full lg:w-2/4"
          onSubmit={calculateCalories}
        >
          <div className="flex flex-col font-bold gap-1">
            <label htmlFor="duration-cardio">
              Duration of Cardiovascular activity
            </label>
            <input
              type="number"
              id="duration-cardio"
              name="duration-cardio"
              placeholder="Enter duration in minutes"
              className="border px-4 py-2 border-[#dadada] w-full bg-white"
              value={cardio}
              onChange={(e) => setCardio(e.target.value)}
            />
          </div>
          <div className="flex flex-col  font-bold gap-1">
            <label htmlFor="duration-workout">Duration of workout</label>
            <input
              type="number"
              id="duration-workout"
              name="duration-workout"
              placeholder="Enter duration in minutes"
              className="border px-4 py-2 border-[#dadada] w-full bg-white"
              value={workout}
              onChange={(e) => setWorkout(e.target.value)}
            />
          </div>
          <div className="flex flex-col font-bold gap-1">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              placeholder="Enter weight in kg"
              className="border px-4 py-2 border-[#dadada] w-full bg-white"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="flex flex-col font-bold gap-1">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              name="height"
              placeholder="Enter height in cm"
              className="border px-4 py-2 border-[#dadada] w-full bg-white"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="border bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 text-white"
          >
            Calculate
          </button>
        </form>
        {caloriesBurned !== null && (
          <div className="flex flex-col font-bold gap-1">
            <p>Total Calories Burned throughout the day</p>
            <div className="border text-center p-4 rounded bg-white border-[#dadada]">
              {caloriesBurned} kcal
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Calorie;
