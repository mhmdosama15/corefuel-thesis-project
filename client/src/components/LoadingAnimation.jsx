import React from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
const LoadingAnimation = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen w-screen  bg-[#F7F7F8]">
      <GiWeightLiftingUp className="loading-icon text-3xl xl:text-8xl" />
      <p className="animate-pulse text-3xl lg:text-6xl font-bold bg-gradient-to-r from-[#1431a4] to-[#0e71af] bg-clip-text text-transparent ">
        Core Fuel
      </p>
    </div>
  );
};

export default LoadingAnimation;
