import React, { useEffect, useState } from "react";

const StepMetrics = () => {
  const [height, setHeight] = useState(sessionStorage.getItem("height") || "");
  const [weight, setWeight] = useState(sessionStorage.getItem("weight") || "");
  const [goalWeight, setGoalWeight] = useState(
    sessionStorage.getItem("goalWeight") || ""
  );

  useEffect(() => {
    setHeight(sessionStorage.getItem("height") || "");
    setWeight(sessionStorage.getItem("weight") || "");
    setGoalWeight(sessionStorage.getItem("goalWeight") || "");
  }, []);

  const handleChange = (e, setter, key) => {
    const value = e.target.value;
    setter(value);
    sessionStorage.setItem(key, value);
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="height" className="font-bold">
          How tall are you?
        </label>
        <input
          type="number"
          id="height"
          name="height"
          placeholder="cm"
          value={height}
          onChange={(e) => handleChange(e, setHeight, "height")}
          className="w-44 p-2 border bg-white border-gray-300 rounded"
          required
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="weight" className="font-bold">
          How much do you weigh?
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={weight}
          onChange={(e) => handleChange(e, setWeight, "weight")}
          placeholder="kg"
          className="w-44 p-2 border bg-white border-gray-300 rounded"
          required
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="goal-weight" className="font-bold">
          What is your goal weight?
        </label>
        <span className="text-sm text-left">
          This does not affect your calorie goal and you can always change it
          later.
        </span>
        <input
          type="number"
          id="goal-weight"
          name="goal-weight"
          value={goalWeight}
          onChange={(e) => handleChange(e, setGoalWeight, "goalWeight")}
          placeholder="kg"
          className="w-44 p-2 border bg-white border-gray-300 rounded"
          required
        />
      </div>
    </div>
  );
};

export default StepMetrics;
