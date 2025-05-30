import React, { useEffect, useState } from "react";

const StepSplit = () => {
  const splits = ["Push, Pull, Legs", "Upper, Lower", "Bro split"];
  const [selectedSplit, setSelectedSplit] = useState(
    sessionStorage.getItem("split") || ""
  );

  const saveSplit = (split) => {
    setSelectedSplit(split);
    sessionStorage.setItem("split", split);
  };

  useEffect(() => {
    const storedSplit = sessionStorage.getItem("split");
    if (storedSplit) {
      setSelectedSplit(storedSplit);
    }
  }, []);

  return (
    <div className="flex flex-col text-center gap-3">
      <h2 className="font-bold">
        Select which split would you like to follow?
      </h2>
      <p>
        Choose the type of split that matches your level of intensity and time
        available.
      </p>
      <div className="grid gap-2">
        {splits.map((split, index) => (
          <button
            key={index}
            onClick={() => saveSplit(split)}
            className={`flex items-center justify-center py-2 px-4 rounded-lg text-center transition duration-300 ${
              selectedSplit === split
                ? "bg-blue-500 text-white"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            {split}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepSplit;
