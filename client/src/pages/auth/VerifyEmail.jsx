import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BACKEND_URL } from "../../utils";

const VerifyEmail = () => {
  const { token } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const checkIfVerified = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/auth/verify-email/${token}`
      );
      if (response.status === 200) {
        setIsVerified(true);
      }
      console.log(response);
    } catch (err) {
      setError(err.response.data.message);
      console.error("Error verifying email:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkIfVerified();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-full gap-20 w-full pt-10 px-8 lg:px-24">
      <div className="flex flex-col items-center w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : isVerified ? (
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <IoIosCheckmarkCircle className="text-[10rem]" />
            <h1 className="text-4xl font-bold  text-center tracking-tight">
              Email Verification Successful
            </h1>
            <p className="text-center text-lg">
              Thank you for verifying your email address.
            </p>
            <p className="text-center text-lg">
              You’re all set! Please return to the app and enjoy the full
              experience.
            </p>
            {user?.username ? (
              <Link to="/dashboard">
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700">
                  Go back to App
                </button>
              </Link>
            ) : (
              <Link to="/signup/username">
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700">
                  continue
                </button>
              </Link>
            )}
          </div>
        ) : (
          <p className="text-center text-xl text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
