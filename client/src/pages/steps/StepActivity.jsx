import React, { useEffect, useState } from "react";

const StepActivity = () => {
  const levels = ["not_very_active", "lightly_active", "active", "very_active"];
  const mapText = {
    not_very_active: "Not very active",
    lightly_active: "Lightly active",
    active: "Active",
    very_active: "Very active",
  };
  const [selectedActivity, setSelectedActivity] = useState(() => {
    return sessionStorage.getItem("activity") || "";
  });

  useEffect(() => {
    sessionStorage.setItem("activity", selectedActivity);
  }, [selectedActivity]);

  return (
    <div className="flex flex-col text-center gap-3">
      <h2 className="font-bold">What is your baseline activity level?</h2>
      <p>Not including workouts</p>
      <div className="grid gap-2">
        {levels.map((level, index) => (
          <button
            key={index}
            onClick={() => setSelectedActivity(level)}
            className={`flex items-center justify-center py-2 px-4 rounded-lg text-center transition duration-300 ${
              selectedActivity === level
                ? "bg-blue-500 text-white"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            <span>{mapText[level]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepActivity;
