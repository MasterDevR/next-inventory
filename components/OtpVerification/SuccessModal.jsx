import React from "react";
import { useRouter } from "next/navigation";

const SuccessModal = ({ message, onClose, otpStatus }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2
          className={`text-2xl font-bold mb-4 text-green-600 ${
            otpStatus !== 200 ? "text-red-500 " : "text-blue-500"
          }`}
        >
          {message}
        </h2>
        <div className="flex justify-between">
          <button
            onClick={handleRedirect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Go to Login Page
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
