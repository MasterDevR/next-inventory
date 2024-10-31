import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import useInventoryStore from "@/components/store/store";
import SuccessModal from "./SuccessModal";

const OtpVerification = () => {
  const { verifyEmail } = useInventoryStore();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [otpStatus, setOtpStatus] = useState();

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify-otp`,
        {
          verifyEmail,
          otp: otpValue,
        }
      );
      if (response.status === 200) {
        setSuccessMessage(
          response.data.message || "OTP verified successfully!"
        );
        setShowSuccessModal(true);
        setOtpStatus(response.data.status);
      }
      setOtpStatus(response.data.status);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred during OTP verification"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendDisabled(true);
    setResendTimer(30);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/resend-otp`,
        { verifyEmail }
      );
      console.log("OTP resent:", response.data);
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Verify Your Email
      </h2>
      <p className="mb-8 text-gray-600">
        We&apos;ve sent a code to your email at{" "}
        <strong className="text-blue-600">{verifyEmail}</strong>. Please enter
        the 4-digit verification code below.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-4 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength="1"
              className="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              disabled={isLoading}
            />
          ))}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className={`flex-grow bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendDisabled}
            className={`ml-4 px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 ${
              resendDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {resendDisabled ? `Resend (${resendTimer}s)` : "Resend OTP"}
          </button>
        </div>
      </form>
      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={() => setShowSuccessModal(false)}
          otpStatus={otpStatus}
        />
      )}
    </div>
  );
};

export default OtpVerification;
