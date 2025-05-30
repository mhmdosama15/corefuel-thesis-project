import axios from "axios";
import React, { useState } from "react";
import { BACKEND_URL } from "../utils";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Food = () => {
  const [food, setFood] = useState(localStorage.getItem("foodTitle") || "");
  const [result, setResult] = useState(
    JSON.parse(localStorage.getItem("foodResult")) || []
  );
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  const passedFoodType = location.state?.foodType || "breakfast";
  const [loading, setLoading] = useState(false);
  const [foodData, setFoodData] = useState({});
  const [foodErr, setFoodErr] = useState(false);
  const [showFoodData, setShowFoodData] = useState(false);
  const [showFoodNutrition, setShowFoodNutrition] = useState(false);
  const [foodType, setFoodType] = useState(passedFoodType);
  const navigate = useNavigate();

  const searchFood = async () => {
    if (!food) {
      setFoodErr("Please enter a food item");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/search-food`,
        { query: food },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response:", response.data); // Debug this!

      if (response.status === 200 && response.data.food) {
        setResult(response.data.food);
        localStorage.setItem("foodTitle", food);
        localStorage.setItem("foodResult", JSON.stringify(response.data.food));
        setFoodErr("");
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error) {
      console.log("Error:", error);
      if (error.response?.status === 404) {
        setFoodErr(error.response.data.message || "Food not found");
      } else {
        setFoodErr("Something went wrong");
      }
      setResult([]);

      localStorage.removeItem("foodTitle");
      localStorage.removeItem("foodResult");
    } finally {
      setLoading(false);
    }
  };

  const selectFood = (food) => {
    setFoodData(food);
    setShowFoodData(true);
    console.log(food);
  };
  const cancelFood = () => {
    setShowFoodData(false);
    setFoodData({});
    setShowFoodNutrition(false);
  };
  const selectFoodNutrition = () => {
    setShowFoodNutrition(true);
  };
  const closeNutrition = () => {
    setShowFoodNutrition(false);
  };

  const addFoodToDiary = async () => {
    if (!foodData) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/save-food`,
        {
          foodData,
          foodType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate("/nutrition");
        setFoodData({});
        setFood("");
        localStorage.removeItem("foodTitle");
        localStorage.removeItem("foodResult");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-6 pt-10 pb-20 lg:px-30 lg:pb-30 gap-2 lg:pt-24">
      <h2 className="border-b border-[#dadada] pb-2">Add Food to your dairy</h2>
      <div className="flex items-center gap-2">
        <input
          placeholder="Search for food"
          className="border w-96 px-4 py-2 rounded-md border-[#dadada]"
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          required
        />
        <button
          disabled={loading}
          onClick={searchFood}
          className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4"
        >
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-3 ">
          {result.length > 0 ? (
            <div className="border border-[#dadada] rounded-md overflow-scroll hide-scrollbar p-3 flex flex-col gap-2 min-h-96 max-h-96 md:w-full lg:min-w-96 lg:max-w-96">
              <ul className="">
                {Array.isArray(result) &&
                  result.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => selectFood(item)}
                      className="flex cursor-pointer px-4 py-2 hover:bg-[#dadada] items-center w-full border-b pb-2 border-[#dadada] "
                    >
                      <div className="flex flex-col  w-full  items-start">
                        <span>{item.title}</span>
                        <span className="text-gray-400">
                          {item?.calories.toFixed(2)} calories
                        </span>
                      </div>
                      <div>
                        <div className="">
                          <img
                            src={item.image}
                            alt=""
                            className="w-20 h-20 object-cover"
                          />
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 text-center">{foodErr}</p>
          )}
          {showFoodData && (
            <div className="border border-[#dadada] rounded-md overflow-scroll hide-scrollbar p-3 flex flex-col justify-between gap-4 text-center min-h-96 max-h-96 md:w-full lg:min-w-96 lg:max-w-96">
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-center text-xl">
                  {foodData?.title}
                </h2>
                <label htmlFor="meal">To which meal?</label>
                <select
                  id="meal"
                  className="border px-4 py-2 border-[#dadada]"
                  value={foodType}
                  onChange={(e) => setFoodType(e.target.value)}
                >
                  <option value="breakfast">Breakfast</option>
                  <option value={"lunch"}>Lunch</option>
                  <option value={"dinner"}>Dinner</option>
                  <option value={"snack"}>Snack</option>
                </select>
                <div className="flex flex-col lg:flex-row items-center gap-2">
                  <button
                    onClick={addFoodToDiary}
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white rounded-md py-2 px-4"
                  >
                    Add to Food dairy
                  </button>
                  <button
                    onClick={selectFoodNutrition}
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white rounded-md py-2 px-4"
                  >
                    Nutrition Info
                  </button>
                </div>
              </div>
              <div className="">
                <button
                  onClick={cancelFood}
                  className="bg-red-500 hover:bg-red-700 text-white rounded-md py-2 px-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {showFoodNutrition && (
            <div className="border border-[#dadada] rounded-md overflow-scroll hide-scrollbar p-3 flex flex-col justify-between gap-4 text-center min-h-96 max-h-96 md:w-full lg:min-w-96 lg:max-w-96">
              <div className="flex flex-col gap-4">
                <h2 className="font-bold text-center text-xl">
                  {foodData?.title}
                </h2>
                <p className="">Meal type: {foodData?.mealType}</p>
                <ul className="text-center">
                  <li>
                    Calories:{" "}
                    <span className="font-bold">
                      {foodData?.calories
                        ? foodData.calories.toFixed(2)
                        : "N/A"}
                      <span className="pl-0.5">kcal</span>
                    </span>
                  </li>
                  <li>
                    Sodium:{" "}
                    <span className="font-bold">
                      {parseFloat(foodData?.sodium)?.toFixed(2) || "N/A"}{" "}
                      {foodData?.sodium?.replace(/[0-9.-]/g, "").trim() || ""}
                    </span>
                  </li>
                  <li>
                    Carbs:{" "}
                    <span className="font-bold">
                      {parseFloat(foodData?.carbs)?.toFixed(2) || "N/A"}{" "}
                      {foodData?.carbs?.replace(/[0-9.-]/g, "").trim() || ""}
                    </span>
                  </li>
                  <li>
                    Fat:{" "}
                    <span className="font-bold">
                      {parseFloat(foodData?.fats)?.toFixed(2) || "N/A"}{" "}
                      {foodData?.fats?.replace(/[0-9.-]/g, "").trim() || ""}
                    </span>
                  </li>
                  <li>
                    Sugar:{" "}
                    <span className="font-bold">
                      {parseFloat(foodData?.sugar)?.toFixed(2) || "N/A"}{" "}
                      {foodData?.sugar?.replace(/[0-9.-]/g, "").trim() || ""}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="">
                <button
                  onClick={closeNutrition}
                  className="bg-red-500 hover:bg-red-700 text-white rounded-md py-2 px-4"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Food;
