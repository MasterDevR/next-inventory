"use client";
import React, { useState } from "react";
import { FaLockOpen, FaLock } from "react-icons/fa";

const CreateEmailForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const showPassword = () => {
    setIsLocked(!isLocked);
  };

  const handleVerificationSubmit = (event) => {
    event.preventDefault();
    // Add your verification logic here
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    setMessage("Verification in progress...");
    // Reset error message
    setErrorMessage("");
  };

  return (
    <div className="bg-white container p-4 shadow-md rounded-md space-y-5 m-auto">
      <h2 className="text-xl font-bold">Change Your Email</h2>
      <p className="text-sm">
        To change your email address, please provide the following information:
        <ol className="list-decimal list-inside">
          <li>Enter your new email address.</li>
          <li>Enter your current password to verify your identity.</li>
          <li>Confirm your current password.</li>
        </ol>
      </p>
      <form onSubmit={handleVerificationSubmit} className="w-full space-y-5">
        <div className="text-sm lg:text-base">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow"
            placeholder="New Email Address"
          />
        </div>
        <div className="text-sm lg:text-base relative">
          <input
            type={isLocked ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow"
            placeholder="Current Password"
          />
          {isLocked ? (
            <FaLockOpen
              size={"1rem"}
              className="absolute bottom-2 left-2 cursor-pointer text-gray-400"
              onClick={showPassword}
            />
          ) : (
            <FaLock
              size={"1rem"}
              className="absolute bottom-2 left-2 cursor-pointer text-gray-400"
              onClick={showPassword}
            />
          )}
        </div>
        <div className="text-sm lg:text-base relative">
          <input
            type={isLocked ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow"
            placeholder="Confirm Current Password"
          />
          {isLocked ? (
            <FaLockOpen
              size={"1rem"}
              className="absolute bottom-2 left-2 cursor-pointer text-gray-400"
              onClick={showPassword}
            />
          ) : (
            <FaLock
              size={"1rem"}
              className="absolute bottom-2 left-2 cursor-pointer text-gray-400"
              onClick={showPassword}
            />
          )}
        </div>
        {/* Error message display */}
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        {/* Success message display */}
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary text-white w-full bg-blue-500 hover:bg-blue-600 p-2 rounded-md transition duration-200"
        >
          Update Email
        </button>
      </form>
    </div>
  );
};

export default CreateEmailForm;
