import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const EDAMAM_API = "https://api.edamam.com/api/recipes/v2?&type=public";
const EDAMAM_ACCOUNT_USER = process.env.EDAMAM_ACCOUNT_USER;
export const generateMotivationalQuote = async (
  goal,
  phase,
  struggle,
  activityLevel
) => {
  const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_KEY}`);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Generate a short, impactful, and unique motivational quote tailored to my fitness journey. My goal is ${goal}, I’m currently in the ${phase} phase, struggling with ${struggle}, and my activity level is ${activityLevel}. Ensure the quote is fresh and distinct from common fitness quotes by incorporating an unexpected metaphor, a vivid action-oriented verb, or a surprising perspective. Avoid clichés like "keep pushing" or "never give up," and do not repeat themes or phrases from previously generated quotes. Make it inspiring, concise (under 20 words), and relevant to my specific journey.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const getFoodInfo = async (query) => {
  try {
    const response = await axios.get(`${EDAMAM_API}`, {
      params: {
        q: query,
        app_id: process.env.EDAMAM_APP_ID,
        app_key: process.env.EDAMAM_KEY,
        from: 0,
        to: 10,
      },
      headers: {
        "Edamam-Account-User": EDAMAM_ACCOUNT_USER,
      },
    });
    return response.data.hits
      .map((recipe) => extractRecipeData(recipe))
      .slice(0, 10);
  } catch (error) {
    console.log(error);
  }
};

const extractRecipeData = (recipe) => {
  let calories, fats, sodium, carbs, sugar, image, title, protein, mealType;
  if (recipe.recipe) {
    calories = recipe.recipe.calories / recipe.recipe.yield || 0;
    title = recipe.recipe.label || "Unknown Title";
    image = recipe.recipe.image || "";
    mealType = recipe.recipe.mealType || "Unknown Meal Type";
    const nutrients = recipe.recipe.totalNutrients || {};

    fats = nutrients.FAT
      ? nutrients.FAT.quantity + " " + nutrients.FAT.unit
      : "N/A";
    sodium = nutrients.NA
      ? nutrients.NA.quantity + " " + nutrients.NA.unit
      : "N/A";
    carbs = nutrients.CHOCDF
      ? nutrients.CHOCDF.quantity + " " + nutrients.CHOCDF.unit
      : "N/A";
    sugar = nutrients.SUGAR
      ? nutrients.SUGAR.quantity + " " + nutrients.SUGAR.unit
      : "N/A";
    protein = nutrients.PROCNT
      ? nutrients.PROCNT.quantity + " " + nutrients.PROCNT.unit
      : "N/A";
  }
  return {
    title,
    image,
    calories,
    fats,
    sodium,
    carbs,
    sugar,
    protein,
    mealType,
  };
};
