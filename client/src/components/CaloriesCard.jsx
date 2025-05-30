import React from "react";
import { useSelector } from "react-redux";

const CaloriesCard = () => {
  const dailyGoals = useSelector((state) => state.user.dailyGoals) || {
    calories: 0,
  };
  const macrosTotals = useSelector((state) => state.user.macrosTotals) || {
    calories: 0,
  };
  const exercises = useSelector((state) => state.user.exercises) || [];

  const baseGoal = dailyGoals.calories;
  const foodCalories = macrosTotals.calories;
  const exerciseCalories = exercises.reduce(
    (total, exercise) => total + (exercise.caloriesBurned || 0),
    0
  );
  const remainingCalories = baseGoal - foodCalories;

  // Calculate percentages for ring fill (visual only)
  const remainingPercentage = baseGoal
    ? Math.max((remainingCalories / baseGoal) * 100, 0)
    : 0;
  const foodPercentage = baseGoal
    ? Math.min((foodCalories / baseGoal) * 100, 100)
    : 0;
  const exercisePercentage = baseGoal
    ? Math.min((exerciseCalories / baseGoal) * 100, 100)
    : 0;

  // CSS for circular progress (same as Macros)
  const circleStyles = (percentage, color) => ({
    strokeDasharray: `${(percentage / 100) * 283}, 283`, // 283 is circumference of 90px circle
    stroke: color,
  });

  return (
    <div className="border flex flex-col md:flex-row border-[#dadada] w-full bg-white shadow-md rounded p-4">
      <h2 className="text-lg font-semibold">Calories</h2>
      <div className="flex flex-col md:flex-row gap-10 w-full md:justify-between mt-6">
        {/* Remaining */}
        <div className="flex items-center justify-center h-24 w-full md:w-24 lg:h-32 lg:w-32 relative">
          <svg className="h-full w-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb" // Tailwind gray-200
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="transition-all duration-500"
              style={circleStyles(remainingPercentage, "#3b82f6")} // Blue-500
              transform="rotate(-90 50 50)"
            />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dy=".3em"
              className="text-lg font-semibold fill-gray-800"
            >
              {remainingCalories.toFixed(0)}
            </text>
          </svg>
          <span className="absolute text-sm mt-8 md:mt-24 lg:mt-32">
            remaining
          </span>
        </div>

        {/* Base Goal, Food, Exercise */}
        <div className="flex flex-col w-full gap-4">
          {/* Base Goal */}
          <div className="flex items-center gap-4">
            <h2 className="w-full md:w-24">Base Goal</h2>
            <div className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 relative">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  style={circleStyles(100, "#10b981")} // Green-500
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-base font-semibold fill-gray-800"
                >
                  {baseGoal.toFixed(0)}
                </text>
              </svg>
            </div>
          </div>

          {/* Food */}
          <div className="flex items-center gap-4">
            <h2 className="w-full md:w-24">Food</h2>
            <div className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 relative">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  style={circleStyles(foodPercentage, "#ef4444")} // Red-500
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-base font-semibold fill-gray-800"
                >
                  {foodCalories.toFixed(0)}
                </text>
              </svg>
            </div>
          </div>

          {/* Exercise */}
          <div className="flex items-center gap-4">
            <h2 className="w-full md:w-24">Exercise</h2>
            <div className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 relative">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="transition-all duration-500"
                  style={circleStyles(exercisePercentage, "#f59e0b")} // Amber-500
                  transform="rotate(-90 50 50)"
                />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-base font-semibold fill-gray-800"
                >
                  {exerciseCalories.toFixed(0)}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCard;
