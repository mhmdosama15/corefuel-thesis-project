import React, { useEffect, useState } from "react";

const StepGoals = () => {
  const goals = [
    "lose_weight",
    "maitain_weight",
    "gain_weight",
    "gain_muscle",
    "increase_step_count",
    "fit_body",
    "shred",
  ];
  const mapText = {
    lose_weight: "Lose Weight",
    maitain_weight: "Maintain Weight",
    gain_weight: "Gain Weight",
    gain_muscle: "Gain Muscle",
    increase_step_count: "Increase Step Count",
    fit_body: "Fit Body",
    shred: "Shred",
  };
  const [selectedGoals, setSelectedGoals] = useState(() => {
    const storedGoals = sessionStorage.getItem("goals");
    return storedGoals ? JSON.parse(storedGoals) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("goals", JSON.stringify(selectedGoals));
  }, [selectedGoals]);

  const addGoal = (goal) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) {
        return prev.filter((g) => g !== goal);
      } else if (prev.length < 4) {
        return [...prev, goal];
      }
      return prev;
    });
  };

  return (
    <div className="flex flex-col text-center gap-3">
      <h2 className="font-bold">What are your main goals?</h2>
      <p>Select up to 4 that match your plans</p>
      <div className="grid gap-2">
        {goals.map((goal, index) => (
          <button
            key={index}
            onClick={() => addGoal(goal)}
            className={`flex items-center justify-center py-2 px-4 rounded-lg text-center transition duration-300 ${
              selectedGoals.includes(goal)
                ? "bg-blue-500 text-white"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            <span>{mapText[goal]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepGoals;
