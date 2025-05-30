import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils";
import { useSelector } from "react-redux";

const EmailPrompt = ({ showVerifyEmail, setShowVerifyEmail }) => {
  const [loading, setLoading] = useState(false);
  const [newVerification, setNewVerification] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const user = useSelector((state) => state.auth?.user);
  const verifyEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/resend-verification-email`,
        {
          email: user.email,
        }
      );

      if (response.status === 200) {
        setShowVerifyEmail(false);
        setNewVerification(true);
        setResendTimer(60);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    if (resendTimer > 0) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/resend-verification-email`,
        { email: user.email }
      );
      if (response.status === 200) {
        setShowVerifyEmail(false);
        setNewVerification(true);
        setResendTimer(60);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [resendTimer]);

  useEffect(() => {
    if (user && !user.isVerified) {
      setShowVerifyEmail(true);
    }
  }, [showVerifyEmail, user]);

  return (
    <>
      {showVerifyEmail && (
        <div className="border  bg-[#ededed] border-[#e0e0e0]  p-4 rounded-lg">
          <div>
            Your email address is not verified. Please click the button below to
            verify.
          </div>
          <button
            disabled={loading}
            onClick={verifyEmail}
            className={` ${
              loading ? "cursor-not-allowed" : ""
            }bg-[#353ddb] text-white hover:bg-[#3c45f3] p-1 px-4 rounded mt-2`}
          >
            Verify Email
          </button>
        </div>
      )}
      {newVerification && (
        <div className="border  bg-green-600 border-[#e0e0e0] text-white p-4 rounded-lg">
          <div>
            A new verification link has been sent. Please check your inbox.
          </div>
          <button
            disabled={resendTimer > 0 || loading}
            onClick={handleResend}
            className={` ${
              resendTimer > 0 ? "cursor-not-allowed" : ""
            } bg-[#353ddb] text-white hover:bg-[#3c45f3] p-1 px-4 rounded mt-2`}
          >
            Resend verification link {resendTimer > 0 && `(${resendTimer}s)`}
          </button>
        </div>
      )}
    </>
  );
};

export default EmailPrompt;
