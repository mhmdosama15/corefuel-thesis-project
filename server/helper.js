// BMR Mifflin formulas
export const calculateBMR = (gender, weight, height, age) => {
  let BMR;
  if (gender === "male") {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  return BMR;
};

// TDEE(Total Daily Energy Expenditure)
export const calculateTDEE = (BMR, exerciseLevel) => {
  const activityFactor = {
    not_very_active: 1.2,
    lightly_active: 1.375,
    active: 1.55,
    very_active: 1.725,
  };
  return BMR * activityFactor[exerciseLevel];
};

export const getCalorieIntake = (goal, tdee) => {
  switch (goal) {
    case "lose_weight":
      return tdee - 500;
    case "maintain_weight":
      return tdee;
    case "gain_weight":
      return tdee + 250;
    case "gain_muscle":
      return tdee + 300;
    case "increase_step_count":
      return tdee;
    case "fit_body":
      return tdee - 250;
    case "shred":
      return tdee - 500;
    default:
      return tdee;
  }
};

export const calculateDailyGoals = (calorieTarget, weight) => {
  // Macro split: 40% protein, 40% carbs, 20% fats (adjustable)
  const proteinCalories = calorieTarget * 0.4;
  const carbsCalories = calorieTarget * 0.4;
  const fatsCalories = calorieTarget * 0.2;

  const protein = Math.round(proteinCalories / 4); // 1 g protein = 4 kcal
  const carbs = Math.round(carbsCalories / 4); // 1 g carbs = 4 kcal
  const fats = Math.round(fatsCalories / 9); // 1 g fats = 9 kcal

  // Cap protein at 2.2 g/kg if desired (optional)
  const maxProtein = Math.round(weight * 2.2);
  const finalProtein = Math.min(protein, maxProtein);

  // Default sodium and sugar goals
  const sodium = 2300; // FDA upper limit
  const sugar = Math.round((calorieTarget * 0.1) / 4); // 10% of calories from sugar

  return {
    calories: Math.round(calorieTarget),
    protein: finalProtein,
    carbs,
    fats,
    sodium,
    sugar,
  };
};
