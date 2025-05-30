import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("exerciseData");
      localStorage.removeItem("token");
      localStorage.removeItem("showDetails");
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, clearUser, setAuth, setToken } = authSlice.actions;
export default authSlice.reducer;
