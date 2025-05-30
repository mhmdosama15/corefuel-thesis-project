import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setMotivationalQuote, setUserDailyGoals } from "../redux/userSlice";
import { BACKEND_URL } from "../utils";
import ExerciseTable from "../components/ExerciseTable";
import Macros from "../components/Macros";
import CaloriesCard from "../components/CaloriesCard";
import EmailPrompt from "../components/EmailPrompt";
const Dashboard = () => {
  const username = useSelector((state) => state.auth.user?.username);
  const goal = useSelector((state) => state.user?.metrics?.goals[0]);
  const phase = useSelector((state) => state.user?.metrics?.phase);
  const activityLevel = useSelector(
    (state) => state.user?.metrics?.activityLevel
  );
  const struggle = useSelector((state) => state.user?.metrics?.struggles[0]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.user.motivationalQuote);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  // Daily goals (you can adjust these as needed)
  const defaultGoals = {
    calories: 2000,
    protein: 100,
    carbs: 250,
    fats: 70,
    sodium: 2300,
    sugar: 50,
  };
  const getMotivationalQuote = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/motivational-quote`,
        { goal, phase, activityLevel, struggle },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch(setMotivationalQuote(response.data.result));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCalorieIntake = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/get-calories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        dispatch(setUserDailyGoals(response.data.dailyGoals));
      }
    } catch (error) {
      console.log(error);
      dispatch(setUserDailyGoals(defaultGoals));
    }
  };

  useEffect(() => {
    getMotivationalQuote();
    getCalorieIntake();
  }, []);
  return (
    <div className="flex flex-col px-6 lg:px-30 pb-30 gap-6 pt-10 lg:pt-20 ">
      <EmailPrompt
        showVerifyEmail={showVerifyEmail}
        setShowVerifyEmail={setShowVerifyEmail}
      />
      <div className="grid lg:grid-cols-2 items-center  gap-10">
        <div className="flex items-center gap-4">
          {" "}
          <div className="flex uppercase rounded-full border h-16 w-16 bg-blue-500 text-center items-center text-white justify-center ">
            {username?.slice(0, 1)}
          </div>
          <h2>{username}</h2>
        </div>

        <p className="italic  ">{quote}</p>
      </div>
      <div className="flex items-center justify-end">
        {/* <h2>1st Day streak</h2> */}
      </div>
      <div className="grid lg:grid-cols-2 gap-10">
        <CaloriesCard />
        <Macros />
      </div>
      <div className="flex flex-col gap-3 border min-h-60 max-h-60 overflow-scroll hide-scrollbar rounded bg-white shadow-md border-[#22168f] p-4">
        <h2>Workout Plan</h2>
        <div className=" ">
          <h2 className="pb-2">Latest Workout exercises</h2>
          <ExerciseTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
