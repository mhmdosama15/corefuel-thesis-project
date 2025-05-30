import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils";
import { useDispatch } from "react-redux";
import { setAuth, setToken, setUser } from "../../redux/authSlice";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const firstName = sessionStorage.getItem("firstName");
    const goals = JSON.parse(sessionStorage.getItem("goals"));
    const struggles = JSON.parse(sessionStorage.getItem("struggles"));
    const height = sessionStorage.getItem("height");
    const weight = sessionStorage.getItem("weight");
    const goalWeight = sessionStorage.getItem("goalWeight");
    const phase = sessionStorage.getItem("phase");
    const activityLevel = sessionStorage.getItem("activity");
    const location = sessionStorage.getItem("location");
    const gender = sessionStorage.getItem("gender");
    const dob = sessionStorage.getItem("dob");
    const splitType = sessionStorage.getItem("split");
    console.log(
      "data",
      firstName,
      email,
      password,
      goals,
      struggles,
      height,
      weight,
      goalWeight,
      phase,
      activityLevel,
      location,
      gender,
      dob,
      splitType
    );
    if (
      !firstName ||
      !email ||
      !password ||
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

    const userData = {
      firstName,
      email,
      password,
      metricsData: {
        goals,
        struggles,
        height,
        weight,
        goalWeight,
        phase,
        activityLevel,
        location,
        gender,
        dob,
        splitType,
      },
    };
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/register`,
        userData
      );
      console.log(response.data);
      if (response.status === 201) {
        sessionStorage.clear();
        localStorage.setItem("token", response.data.token);
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.user));
        dispatch(setAuth(true));
        navigate("/signup/username");
      }
    } catch (error) {
      console.log("error", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length < 10) {
      setError("Password must be at least 10 characters");
    } else {
      setError("");
    }
    setPassword(newPassword);
  };
  return (
    <div className="flex flex-col gap-8 items-center px-6 xl:px-0 justify-center h-screen w-full">
      <div className="flex flex-col lg:min-h-[32rem] lg:min-w-[32rem] lg:max-w-[32rem] p-6 border border-[#dadada] justify-between items-center text-center rounded-lg bg-white">
        <div className="flex flex-col h-full gap-4">
          <h2>Almost there! Create your account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full px-4 py-2 border-[#dadada] bg-white"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="border w-full px-4 py-2 border-[#dadada] bg-white"
                required
              />
              <span className="pb-10 lg:pb-0">
                Password must be at least 10 characters
              </span>
            </div>
            <div className="">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4"
              >
                Continue
              </button>
            </div>
          </form>
          <div className="flex mt-10 gap-2 items-center justify-center w-full">
            <p> Already have an account?</p>
            <Link to={"/login"} className="text-blue-500 hover:text-blue-700">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
