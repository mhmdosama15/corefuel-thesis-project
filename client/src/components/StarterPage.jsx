import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import StepName from "../pages/steps/StepName";
import StepGoals from "../pages/steps/StepGoals";
import StepStruggle from "../pages/steps/StepStruggle";
import StepSplit from "../pages/steps/StepSplit";
import StepPhase from "../pages/steps/StepPhase";
import StepActivity from "../pages/steps/StepActivity";
import StepProfile from "../pages/steps/StepProfile";
import StepMetrics from "../pages/steps/StepMetrics";

const StarterPage = () => {
  const location = useLocation();
  const stepNumber = parseInt(location.pathname.split("-")[1]);
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen  px-6 xl:px-0  w-full">
      <div className="flex flex-col lg:min-h-[32rem] lg:min-w-[32rem] lg:max-w-[32rem] p-6 border border-[#dadada] justify-between items-center text-center rounded bg-
      ] shadow-md">
        <Routes>
          <Route path="step-1" element={<StepName />} />
          <Route path="step-2" element={<StepGoals />} />
          <Route path="step-3" element={<StepStruggle />} />
          <Route path="step-4" element={<StepSplit />} />
          <Route path="step-5" element={<StepPhase />} />
          <Route path="step-6" element={<StepActivity />} />
          <Route path="step-7" element={<StepProfile />} />
          <Route path="step-8" element={<StepMetrics />} />
        </Routes>

        <div className="flex items-center gap-6 mt-6">
          <Link
            to={
              stepNumber === 1
                ? `/`
                : `/starter/step-${Math.max(1, stepNumber - 1)}`
            }
            className="border border-[#dadada] bg-white text-black px-4 py-2"
          >
            Back
          </Link>
          <Link
            to={
              stepNumber === 8 ? `/signup` : `/starter/step-${stepNumber + 1}`
            }
            className="border border-[#dadada] bg-white text-black px-4 py-2"
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StarterPage;
