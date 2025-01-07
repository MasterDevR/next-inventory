import React, { useState } from "react";
import axios from "axios";
import useInventoryStore from "@/components/store/store";

const VerifyOtpModal = ({ setOtpModalVisible, setIsVerified }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { department_id, token } = useInventoryStore();
  const { updateSuccessModal, updateModalMessage, updateStatuss } =
    useInventoryStore();

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleOtpSubmit = async () => {
    const otpString = otp.join("");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/user/verify-otp/${department_id}`,
      { otp: otpString },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.status === 200) {
      setIsVerified(true);
      setOtpModalVisible(false);
      updateSuccessModal(true);
      updateModalMessage(response.data.message);
      updateStatuss(response.data.status);
    } else {
      setIsVerified(false);
      updateSuccessModal(true);
      updateModalMessage(response.data.message);
      updateStatuss(response.data.status);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        OTP Verification
      </h2>
      <p className="text-gray-600 mb-6">
        A verification code has been sent to your email address. Please check
        your inbox and use the code to proceed.
      </p>
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="0"
            className="border border-gray-300 rounded-md p-4 w-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            maxLength={1}
            required
          />
        ))}
      </div>
      <footer className="flex justify-between w-full mt-6">
        <button
          onClick={handleOtpSubmit}
          className="btn btn-primary btn-outline hover:bg-blue-500 hover:text-white transition duration-200"
        >
          Verify OTP
        </button>
        <button
          onClick={() => setOtpModalVisible(false)}
          className="btn btn-error btn-outline hover:bg-red-500 hover:text-white transition duration-200"
        >
          Close
        </button>
      </footer>
    </div>
  );
};

export default VerifyOtpModal;
