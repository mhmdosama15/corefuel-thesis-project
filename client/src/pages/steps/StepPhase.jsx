import React, { useEffect, useState } from "react";

const StepPhase = () => {
  const phases = [
    "Lean Bulk: Gaining muscle with a bit of fat",
    "Shredding: Losing a good amount of fat",
    "Body Composition: Gaining muscles with the fewest amount of fat gained",
  ];

  const [selectedPhase, setSelectedPhase] = useState(() => {
    return sessionStorage.getItem("phase") || "";
  });

  useEffect(() => {
    sessionStorage.setItem("phase", selectedPhase);
  }, [selectedPhase]);

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
        {phases.map((phase, index) => (
          <button
            key={index}
            onClick={() => setSelectedPhase(phase)}
            className={`flex items-center justify-center py-2 px-4 rounded-lg text-center transition duration-300 ${
              selectedPhase === phase
                ? "bg-blue-500 text-white"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            <span>{phase}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepPhase;
