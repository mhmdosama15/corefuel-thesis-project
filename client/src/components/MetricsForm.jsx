import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../utils";
import axios from "axios";
import { setUserDailyGoals, setUserMetrics } from "../redux/userSlice";
const MetricsForm = ({ setShowMetrics, authenticateUser }) => {
  const defaultGoals = [
    "lose_weight",
    "maitain_weight",
    "gain_weight",
    "gain_muscle",
    "increase_step_count",
    "fit_body",
    "shred",
  ];
  const defaultStruggles = [
    "Lack of time",
    "Food Cravings",
    "Balancing my diet",
    "Social events/Vacations",
    "Healthy Food is expensive",
    "Lack of healthy food variety",
    "Lack of progress",
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
  const phases = [
    "Lean Bulk: Gaining muscle with a bit of fat",
    "Shredding: Losing a good amount of fat",
    "Body Composition: Gaining muscles with the fewest amount of fat gained",
  ];
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    return new Date(isoDate).toISOString().split("T")[0];
  };

  const metrics = useSelector((state) => state.user?.metrics);

  const [gender, setGender] = useState(metrics?.gender || "male");
  const [location, setLocation] = useState(metrics?.location || "Egypt");
  const [weight, setWeight] = useState(metrics?.weight || 70);
  const [goalWeight, setGoalWeight] = useState(metrics?.goalWeight || 70);
  const [phase, setPhase] = useState(
    metrics.phase || "Lean Bulk: Gaining muscle with a bit of fat"
  );

  const [dob, setDob] = useState(formatDateForInput(metrics?.dob));

  const [height, setHeight] = useState(metrics?.height || 170);
  const [activityLevel, setActivityLevel] = useState(
    metrics.activityLevel || "Active"
  );
  const [splitType, setSplitType] = useState(
    metrics.splitType || "Push, Pull, Legs"
  );
  const goals = metrics?.goals || [];
  const struggles = metrics?.struggles || [];
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedStruggles, setSelectedStruggles] = useState([]);
  const token = useSelector((state) => state.auth?.token);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (goals.length > 0) {
      setSelectedGoals(goals);
    }
  }, [goals]);

  useEffect(() => {
    if (struggles.length > 0) {
      setSelectedStruggles(struggles);
    }
  }, [struggles]);
  const handleCheckboxChange = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };
  const handleCheckboxChangeStruggle = (struggle) => {
    if (selectedStruggles.includes(struggle)) {
      setSelectedStruggles(selectedStruggles.filter((s) => s !== struggle));
    } else {
      setSelectedStruggles([...selectedStruggles, struggle]);
    }
  };
  const getCalorieIntake = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/get-calories`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      if (response.status === 200) {
        dispatch(setUserDailyGoals(response.data.dailyGoals));
      }
    } catch (error) {
      console.log(error);
      //   dispatch(setUserDailyGoals(defaultGoals));
    }
  };
  const updateMetrics = async (e) => {
    e.preventDefault();
    if (
      !goals ||
      !struggles ||
      !height ||
      !weight ||
      !goalWeight ||
      !phase ||
      !activityLevel ||
      !location ||
      !gender ||
      !dob ||
      !splitType
    ) {
      alert("Please complete all fields");
      return;
    }
    const metricsData = {
      gender,
      location,
      weight,
      goalWeight,
      phase,
      dob,
      height,
      activityLevel,
      splitType,
      goals: selectedGoals,
      struggles: selectedStruggles,
    };
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/user/update-metrics`,
        { metricsData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        authenticateUser();
        setSuccessMessage("Metrics updated successfully");
        dispatch(setUserMetrics(response.data.metrics));
        getCalorieIntake();
        setTimeout(() => {
          setShowMetrics(false);
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={updateMetrics} className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="gender" className="font-bold">
          Gender
        </label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
        >
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="font-bold">
          Where do you live?
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="dob" className="font-bold">
          Date of Birth{" "}
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[
        #dadada]"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phase" className="font-bold">
          Phase
        </label>
        <select
          id="phase"
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
        >
          {phases.map((phase, index) => (
            <option value={phase} key={index}>
              {phase}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="flex flex-col gap-2 items-start">
      <label htmlFor="age">Age</label>
      <input
        id="age"
        placeholder="Age"
        className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </div> */}
      <div className="flex  flex-col gap-2 items-start">
        <label htmlFor="weight" className="font-bold">
          Weight
        </label>
        <input
          id="weight"
          placeholder="weight"
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="goal-weight" className="font-bold">
          Goal Weight
        </label>
        <input
          id="goal-weight"
          placeholder="goal weight"
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
          type="number"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="height" className="font-bold">
          Height
        </label>
        <input
          id="height"
          placeholder="height"
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="activity-level" className="font-bold">
          Activity Level
        </label>
        <select
          id="activity-level"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
        >
          <option value={"not_very_active"}>Not Active</option>
          <option value={"lightly_active"}>Lightly Active</option>
          <option value={"active"}>Active</option>
          <option value={"very_active"}>Very Active</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <label htmlFor="split-type" className="font-bold">
          Split Type
        </label>
        <select
          id="split-type"
          value={splitType}
          onChange={(e) => setSplitType(e.target.value)}
          className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
        >
          <option value={"Push, Pull, Legs"}>Push, Pull, Legs</option>
          <option value={"Upper, Lower"}>Upper, Lower</option>
          <option value={"Bro split"}>Bro split</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h3 className="font-bold">Select Your Goals</h3>
        {defaultGoals.map((goal, index) => (
          <div className="flex gap-4 items-center" key={index}>
            <label className="text-lg lg:text-sm w-52">{mapText[goal]}</label>
            <input
              type="checkbox"
              className="transform scale-150"
              id={goal}
              name={goal}
              checked={selectedGoals.includes(goal)}
              onChange={() => handleCheckboxChange(goal)}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold">Select Your Struggles</h2>
        {defaultStruggles.map((struggle, index) => (
          <div className="flex gap-4 items-center" key={index}>
            <label className="text-lg lg:text-sm w-52">{struggle}</label>
            <input
              type="checkbox"
              className="transform scale-150"
              id={struggle}
              name={struggle}
              checked={selectedStruggles.includes(struggle)}
              onChange={() => handleCheckboxChangeStruggle(struggle)}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500  ${
          loading ? "cursor-not-allowed hover:bg-blue-500" : "hover:bg-blue-700"
        } text-white rounded-md py-2 px-4`}
      >
        Save
      </button>
      {successMessage && (
        <p className="text-green-500 text-lg mt-4">{successMessage}</p>
      )}
    </form>
  );
};

export default MetricsForm;
