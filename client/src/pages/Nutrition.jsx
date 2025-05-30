import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Nutrients from "../components/Nutrients";
import { setMacrosTotals } from "../redux/userSlice";

const Nutrition = () => {
  const today = new Date().toISOString().slice(0, 10);
  const foodData = [
    "Food Name",
    "Calories",
    "Protein",
    "Carbs",
    "Fat",
    "Sodium",
    "Sugar",
  ];

  const token = useSelector((state) => state.auth.token);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const dailyGoals = useSelector((state) => state.user?.dailyGoals);
  // Function to calculate total nutritional values from food items
  const dispatch = useDispatch();
  const calculateTotals = (foodItems) => {
    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      sodium: 0,
      sugar: 0,
    };

    foodItems.forEach((item) => {
      const macros = item.foodMacros || {};
      totals.calories += macros.calories || 0;
      totals.protein += macros.protein || 0;
      totals.carbs += macros.carbs || 0;
      totals.fats += macros.fats || 0;
      totals.sodium += macros.sodium || 0;
      totals.sugar += macros.sugar || 0;
    });
    dispatch(setMacrosTotals(totals));
    return totals;
  };

  // Function to calculate remaining values
  const calculateRemaining = (totals, goals) => {
    return {
      calories: goals.calories - totals.calories,
      protein: goals.protein - totals.protein,
      carbs: goals.carbs - totals.carbs,
      fats: goals.fats - totals.fats,
      sodium: goals.sodium - totals.sodium,
      sugar: goals.sugar - totals.sugar,
    };
  };
  const fetchFoodData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/user/get-user-food`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        const userFood = response.data.userFood;
        const tempBreakfast = [];
        const tempLunch = [];
        const tempDinner = [];
        const tempSnacks = [];

        userFood.forEach((item) => {
          if (item.foodType === "breakfast") {
            tempBreakfast.push(item);
          } else if (item.foodType === "lunch") {
            tempLunch.push(item);
          } else if (item.foodType === "dinner") {
            tempDinner.push(item);
          } else if (item.foodType === "snack") {
            tempSnacks.push(item);
          }
        });
        console.log(tempBreakfast);
        setBreakfast(tempBreakfast);
        setLunch(tempLunch);
        setDinner(tempDinner);
        setSnacks(tempSnacks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/delete-food`,
        { foodId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        fetchFoodData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  // Combine all food items to calculate totals
  const allFoodItems = [...breakfast, ...lunch, ...dinner, ...snacks];

  // Calculate total nutritional values
  const totals = calculateTotals(allFoodItems);

  // Calculate remaining values
  const remaining = calculateRemaining(totals, dailyGoals);

  // Values for rendering in the table
  const totalValues = [
    totals.calories.toFixed(2),
    totals.protein.toFixed(2),
    totals.carbs.toFixed(2),
    totals.fats.toFixed(2),
    totals.sodium.toFixed(2),
    totals.sugar.toFixed(2),
  ];

  const goalValues = [
    dailyGoals.calories,
    dailyGoals.protein,
    dailyGoals.carbs,
    dailyGoals.fats,
    dailyGoals.sodium,
    dailyGoals.sugar,
  ];

  const remainingValues = [
    remaining.calories.toFixed(2),
    remaining.protein.toFixed(2),
    remaining.carbs.toFixed(2),
    remaining.fats.toFixed(2),
    remaining.sodium.toFixed(2),
    remaining.sugar.toFixed(2),
  ];

  return (
    <div className="flex flex-col px-6 lg:px-30 pb-10 lg:pb-30 gap-2 pt-10 lg:pt-24">
      {/* Breakfast Section */}
      <div className="flex flex-col lg:flex-row items-start lg:justify-between border-b font-bold border-b-[#dadada] gap-6 pb-10 lg:gap-44">
        <div className="flex flex-col gap-4">
          <p>Breakfast</p>
          <Link
            to={"/food"}
            state={{ foodType: "breakfast" }}
            className="border border-[#dadada] text-nowrap px-4 py-1 rounded-md bg-blue-500 text-white"
          >
            Add Food
          </Link>
        </div>
        <Nutrients deleteFood={deleteFood} food={breakfast} />
      </div>

      {/* Lunch Section */}
      <div className="flex flex-col lg:flex-row items-start lg:justify-between border-b font-bold border-b-[#dadada] gap-6 pb-10 lg:gap-44">
        <div className="flex flex-col gap-4">
          <p>Lunch</p>
          <Link
            to={"/food"}
            state={{ foodType: "lunch" }}
            className="border border-[#dadada] text-nowrap px-4 font-bold py-1 rounded-md bg-blue-500 text-white"
          >
            Add Food
          </Link>
        </div>
        <Nutrients deleteFood={deleteFood} food={lunch} />
      </div>

      {/* Dinner Section */}
      <div className="flex flex-col lg:flex-row items-start border-b border-b-[#dadada]  font-bold gap-6 pb-10 lg:gap-44">
        <div className="flex flex-col gap-4">
          <p>Dinner</p>
          <Link
            to={"/food"}
            state={{ foodType: "dinner" }}
            className="border border-[#dadada] text-nowrap px-4 py-1 rounded-md font-bold bg-blue-500 text-white"
          >
            Add Food
          </Link>
        </div>
        <Nutrients deleteFood={deleteFood} food={dinner} />
      </div>

      {/* Snacks Section */}
      <div className="flex flex-col lg:flex-row items-start lg:justify-between border-b font-bold border-b-[#dadada] gap-6 pb-10 lg:gap-44">
        <div className="flex flex-col gap-4">
          <p>Snacks</p>
          <Link
            to={"/food"}
            state={{ foodType: "snack" }}
            className="border border-[#dadada] text-nowrap px-4 py-1 rounded-md bg-blue-500 text-white"
          >
            Add Food
          </Link>
        </div>
        <Nutrients deleteFood={deleteFood} food={snacks} />
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              {foodData.map((item, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Total Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                Total
              </td>
              {totalValues.map((item, index) => (
                <td
                  key={index}
                  className="border text-center border-gray-300 px-4 py-2"
                >
                  {item}
                </td>
              ))}
            </tr>

            {/* Daily Goal Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                Your Daily Goal
              </td>
              {goalValues.map((item, index) => (
                <td
                  key={index}
                  className="border text-center border-gray-300 px-4 py-2"
                >
                  {item}
                </td>
              ))}
            </tr>

            {/* Remaining Row */}
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">
                Remaining
              </td>
              {remainingValues.map((item, index) => (
                <td
                  key={index}
                  className="border text-center border-gray-300 px-4 py-2"
                  style={{
                    color: item < 0 ? "red" : "green", // Highlight negative values in red
                  }}
                >
                  {item}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Nutrition;
