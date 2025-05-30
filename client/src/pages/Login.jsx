import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth, setToken, setUser } from "../redux/authSlice";
import { BACKEND_URL } from "../utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.user));
        dispatch(setAuth(true));
        dispatch(setToken(response.data.token));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center px-6 xl:px-0 justify-center h-screen w-full">
      <div className="flex flex-col lg:min-h-[32rem]  lg:min-w-[32rem]  lg:max-w-[32rem] p-6 border border-[#dadada] justify-between items-center text-center rounded-lg bg-white">
        <div className="flex flex-col gap-4">
          <h2>Log into your account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border w-full lg:w-96 px-4 py-2 border-[#dadada] bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="border w-full lg:w-96 px-4 py-2 border-[#dadada] bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span></span>
            </div>
            <div className="flex items-end justify-end">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-6 lg:mt-10">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center w-full gap-2">
            <span className="">Don't have an account?</span>
            <Link
              to={"/starter/step-1"}
              className="text-blue-500 hover:text-blue-700"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
