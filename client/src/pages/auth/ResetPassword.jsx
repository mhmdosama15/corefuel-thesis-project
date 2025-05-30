import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../utils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { token } = useParams();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/reset-password`,
        {
          token,
          newPassword: password,
          confirmPassword: confirmPassword,
        }
      );
      if (response.status === 200) {
        setShowSuccess(true);
        setError(false);
        setSuccess("Password updated successfully. redirecting...");
        setTimeout(() => {
          setSuccess("");
          window.location = "/login";
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setShowError(true);
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    }
  };
  return (
    <div className="flex flex-col gap-20  w-full pt-10 px-8 lg:px-24">
      <div className="flex flex-col gap-8 pt-32 items-center justify-evenly  ">
        <div className="flex flex-col items-center w-full md:w-1/2 lg:w-auto   h-full lg:justify-center gap-2">
          <div className="flex flex-col items-center  w-full gap-4">
            <h1 className="text-4xl  font-bold tracking-tight">
              Reset Password
            </h1>
            <p className="">Enter a new password for your account.</p>
          </div>
        </div>
        <div className=" w-[0.08px] h-full bg-[#343333]"></div>
        <div className="w-full md:w-1/2 lg:w-auto">
          <form onSubmit={handleSubmit} className="">
            {showError && (
              <div
                className={`text-red-500 text-sm mt-1 pb-4 transition-opacity ease-in-out  duration-1000 ${
                  showError ? "opacity-100" : "opacity-0"
                }`}
              >
                {error}
              </div>
            )}
            {showSuccess && (
              <div
                className={`text-green-500  md:w-96 text-sm mt-1 pb-4 transition-opacity ease-in-out  duration-1000 ${
                  showSuccess ? "opacity-100" : "opacity-0"
                }`}
              >
                {success}
              </div>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <input
                  placeholder="password"
                  className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaEye
                  className="cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="flex gap-2 items-center">
                <input
                  placeholder="confirm-password"
                  className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaEye
                  className="cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="bg-blue-700 transition-all duration-300 hover:bg-blue-600 py-2 text-center flex text-white items-center justify-center w-full lg:w-96 rounded-lg"
              >
                {loading ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
