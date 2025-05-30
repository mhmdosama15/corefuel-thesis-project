import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  motivationalQuote: null,
  note: null,
  exercises: [],
  macrosTotals: null,
  dailyGoals: null,
  metrics: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMotivationalQuote: (state, action) => {
      state.motivationalQuote = action.payload;
    },
    setNoteState: (state, action) => {
      state.note = action.payload;
    },
    setUserExercises: (state, action) => {
      state.exercises = action.payload;
    },
    setMacrosTotals: (state, action) => {
      state.macrosTotals = action.payload;
    },
    setUserDailyGoals: (state, action) => {
      state.dailyGoals = action.payload;
    },
    setUserMetrics: (state, action) => {
      state.metrics = action.payload;
    },
    resetUserSlice: (state) => {
      state.exercises = [];
      state.note = null;
      state.macrosTotals = null;
      state.dailyGoals = null;
      state.metrics = null;
    },
  },
});

export const {
  setMotivationalQuote,
  setNoteState,
  setUserExercises,
  setUserDailyGoals,
  setMacrosTotals,
  setUserMetrics,
  resetUserSlice,
} = userSlice.actions;
export default userSlice.reducer;
