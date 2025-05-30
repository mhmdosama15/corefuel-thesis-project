import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../utils";
import MetricsForm from "../components/MetricsForm";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { FaEye } from "react-icons/fa";
const Settings = ({ authenticateUser }) => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.user?.username);
  const userEmail = useSelector((state) => state.auth.user?.email);
  const [name, setName] = useState(username);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("");
  // const [age, setAge] = useState(20);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const changeName = () => {
    setShowNameInput(!showNameInput);
  };
  const changeEmail = () => {
    setShowEmailInput(!showEmailInput);
  };
  const changePassword = () => {
    setShowPasswordInput(!showPasswordInput);
  };

  const showUserMetrics = () => {
    setShowMetrics(!showMetrics);
  };
  const updateUserName = async () => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/auth/update`,
        { username: name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        authenticateUser();
        setNameSuccess("Name updated successfully");
        dispatch(setUser(response.data.updatedUser));
        setTimeout(() => {
          setShowNameInput(false);
          setNameSuccess("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserEmail = async () => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/auth/update`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        authenticateUser();
        setEmailSuccess("Email updated successfully");
        dispatch(setUser(response.data.updatedUser));
        setTimeout(() => {
          setShowEmailInput(false);
          setEmailSuccess("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setEmailError(error.response.data.message);
    }
  };
  const updatePassword = async () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/auth/update`,
        { password },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      if (response.status === 200) {
        authenticateUser();
        setPasswordSuccess("Password updated successfully");
        dispatch(setUser(response.data.updatedUser));
        setTimeout(() => {
          setShowPasswordInput(false);
          setPasswordSuccess("");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col px-6 pt-10 lg:px-30 lg:pb-30 gap-6 lg:pt-24">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="flex flex-col gap-3 items-start bg-white border border-[#dadada] rounded-lg p-4  ">
        <div className="flex items-center gap-1">
          <div className="border rounded-full h-10 w-10 bg-blue-500 text-white flex items-center justify-center">
            {username?.charAt(0)}
          </div>
          <p>{username}</p>
        </div>
        <button
          onClick={showUserMetrics}
          className="text-blue-700 cursor-pointer hover:text-blue-500"
        >
          {showMetrics ? "Cancel" : "Change Metrics "}
        </button>
        {showMetrics && (
          <MetricsForm
            authenticateUser={authenticateUser}
            setShowMetrics={setShowMetrics}
          />
        )}
        <button
          onClick={changeName}
          className="text-blue-700 cursor-pointer hover:text-blue-500"
        >
          {showNameInput ? "Cancel" : "Change Username "}
        </button>
        {showNameInput && (
          <div className="flex gap-2 items-center">
            <input
              placeholder="Name"
              className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              onClick={updateUserName}
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4"
            >
              Save
            </button>
            {nameSuccess && <div className="text-green-500">{nameSuccess}</div>}
          </div>
        )}
        <button
          onClick={changeEmail}
          className="text-blue-700 cursor-pointer hover:text-blue-500"
        >
          {showEmailInput ? "Cancel" : "Change Email "}
        </button>
        {showEmailInput && (
          <div className="flex gap-2 items-center">
            <input
              placeholder="Email"
              className="border lg:w-96 w-full px-4 py-2 rounded-md border-[#dadada]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={updateUserEmail}
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4"
            >
              Save
            </button>
            {emailSuccess && (
              <div className="text-green-500">{emailSuccess}</div>
            )}
            {emailError && <div className="text-red-500">{emailError}</div>}
          </div>
        )}
        <button
          onClick={changePassword}
          className="text-blue-700 cursor-pointer hover:text-blue-500"
        >
          {showPasswordInput ? "Cancel" : "Change Password "}
        </button>
        {showPasswordInput && (
          <div className="flex flex-col gap-3">
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
                onClick={() => setPasswordVisible(!isPasswordVisible)}
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
                onClick={() =>
                  setConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
              />
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            {passwordSuccess && (
              <p className="text-green-500">{passwordSuccess}</p>
            )}
            <button
              onClick={updatePassword}
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-md py-2 px-4"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
