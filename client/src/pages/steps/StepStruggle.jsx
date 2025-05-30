import React, { useEffect, useState } from "react";

const StepStruggle = () => {
  const struggles = [
    "Lack of time",
    "Food Cravings",
    "Balancing my diet",
    "Social events/Vacations",
    "Healthy Food is expensive",
    "Lack of healthy food variety",
    "Lack of progress",
  ];

  const [selectedStruggles, setSelectedStruggles] = useState(() => {
    const storedStruggles = sessionStorage.getItem("struggles");
    return storedStruggles ? JSON.parse(storedStruggles) : [];
  });

  const addStruggle = (struggle) => {
    let updatedStruggles;
    if (selectedStruggles.includes(struggle)) {
      updatedStruggles = selectedStruggles.filter((s) => s !== struggle);
    } else {
      updatedStruggles = [...selectedStruggles, struggle];
    }
    setSelectedStruggles(updatedStruggles);
    sessionStorage.setItem("struggles", JSON.stringify(updatedStruggles));
  };

  useEffect(() => {
    const storedStruggles = sessionStorage.getItem("struggles");
    if (storedStruggles) {
      setSelectedStruggles(JSON.parse(storedStruggles));
    }
  }, []);

  return (
    <div className="flex flex-col text-center gap-3">
      <h2 className="font-bold">
        Previously, what have you been struggling the most with?
      </h2>
      <p>Select all that apply</p>
      <div className="grid gap-2">
        {struggles.map((struggle, index) => (
          <button
            key={index}
            onClick={() => addStruggle(struggle)}
            className={`flex items-center justify-center py-2 px-4 rounded-lg text-center transition duration-300 ${
              selectedStruggles.includes(struggle)
                ? "bg-blue-500 text-white"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            <span>{struggle}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StepStruggle;
