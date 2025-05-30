import React from "react";
import { useSelector } from "react-redux";

const Macros = () => {
  // Fetch dailyGoals and macrosTotals from Redux
  const dailyGoals = useSelector((state) => state.user.dailyGoals) || {
    carbs: 0,
    fats: 0,
    protein: 0,
  };
  const totals = useSelector((state) => state.user.macrosTotals) || {
    carbs: 0,
    fats: 0,
    protein: 0,
  };

  // Calculate percentages
  const proteinPercentage = dailyGoals.protein
    ? Math.min((totals.protein / dailyGoals.protein) * 100, 100)
    : 0;
  const carbsPercentage = dailyGoals.carbs
    ? Math.min((totals.carbs / dailyGoals.carbs) * 100, 100)
    : 0;
  const fatsPercentage = dailyGoals.fats
    ? Math.min((totals.fats / dailyGoals.fats) * 100, 100)
    : 0;

  // CSS for circular progress
  const circleStyles = (percentage, color) => ({
    strokeDasharray: `${(percentage / 100) * 283}, 283`, // 283 is circumference of 90px circle
    stroke: color,
  });

  return (
    <div className="border border-[#dadada] bg-white shadow-md rounded p-4">
      <h2 className="text-lg font-semibold">Macros</h2>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Protein */}
        <div className="flex flex-col items-center">
          <svg className="h-20 w-20 lg:h-32 lg:w-32" viewBox="0 0 100 100">
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
              style={circleStyles(proteinPercentage, "#3b82f6")} // Blue-500
              transform="rotate(-90 50 50)" // Start from top
            />
          </svg>
          <p className="mt-2 text-sm font-medium">Protein</p>
          <p className="text-xs text-gray-600">
            {totals.protein.toFixed(1)} / {dailyGoals.protein} g
          </p>
          <p className="text-xs text-gray-500">
            {proteinPercentage.toFixed(1)}%
          </p>
        </div>

        {/* Carbs */}
        <div className="flex flex-col items-center">
          <svg className="h-20 w-20 lg:h-32 lg:w-32" viewBox="0 0 100 100">
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
              style={circleStyles(carbsPercentage, "#10b981")} // Green-500
              transform="rotate(-90 50 50)"
            />
          </svg>
          <p className="mt-2 text-sm font-medium">Carbs</p>
          <p className="text-xs text-gray-600">
            {totals.carbs.toFixed(1)} / {dailyGoals.carbs} g
          </p>
          <p className="text-xs text-gray-500">{carbsPercentage.toFixed(1)}%</p>
        </div>

        {/* Fats */}
        <div className="flex flex-col items-center">
          <svg className="h-20 w-20 lg:h-32 lg:w-32" viewBox="0 0 100 100">
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
              style={circleStyles(fatsPercentage, "#ef4444")} // Red-500
              transform="rotate(-90 50 50)"
            />
          </svg>
          <p className="mt-2 text-sm font-medium">Fats</p>
          <p className="text-xs text-gray-600">
            {totals.fats.toFixed(1)} / {dailyGoals.fats} g
          </p>
          <p className="text-xs text-gray-500">{fatsPercentage.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default Macros;
