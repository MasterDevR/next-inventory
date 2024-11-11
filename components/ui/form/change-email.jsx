"use client";
import React, { useRef, useState } from "react";
import { FaLockOpen, FaLock } from "react-icons/fa";
import axios from "axios";
import useInventoryStore from "@/components/store/store";
import ConfimModal from "@/components/ui/modal/confirm-modal";

const ChangeEmail = () => {
  const modalRef = useRef();
  const {
    department_id,
    token,
    updateStatuss,
    updateModalMessage,
    updateSuccessModal,
  } = useInventoryStore();
  const [isLocked, setIsLocked] = useState(false);
  const [formData, setFormData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const showPassword = () => {
    setIsLocked(!isLocked);
  };

  const submitHandler = async (e) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/change-email/${department_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === 403) {
        setErrorMessage(response.data.message);
      } else {
        updateStatuss(response.data.status);
        updateModalMessage(response.data.message);
        updateSuccessModal(true);
        setErrorMessage(""); // Clear any previous error message
      }
    } catch (error) {
      updateStatuss(403);
      updateModalMessage("Something went wrong.");
      updateSuccessModal(true);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormData(new FormData(e.target));
    modalRef.current.showModal();
    let form = e.target;
    // form.reset();
  };

  const handleConfirm = (e) => {
    modalRef.current.close();
    submitHandler(e);
  };

  return (
    <>
      <ConfimModal modalRef={modalRef} onConfirm={handleConfirm} />
      <div className="bg-white container p-4 shadow-md rounded-md space-y-5 m-auto">
        <strong className="text-xl">Change Your Email</strong>
        <p className="text-sm">
          To change your email address, please provide the following
          information:
        </p>
        <ul className="menu">
          <li>
            <h2 className="menu-title">1. Enter your new email address.</h2>
            <h2 className="menu-title">
              2. Enter your current password to verify your identity.
            </h2>
            <h2 className="menu-title">3. Confirm your current password.</h2>
          </li>
        </ul>
        <form onSubmit={handleFormSubmit} className="w-full space-y-5">
          <div className="text-sm lg:text-base">
            <input
              className="peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow"
              type="email"
              placeholder="New Email Address"
              name="new_email"
              required
            />
          </div>
          <div className="text-sm lg:text-base">
            <input
              className="peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow"
              type={isLocked ? "text" : "password"}
              placeholder="Current Password"
              name="current_password"
              required
            />
            {isLocked ? (
              <FaLockOpen
                size={"1rem"}
                className="relative bottom-7 left-2 cursor-pointer text-gray-400 peer-focus:text-black"
                onClick={showPassword}
              />
            ) : (
              <FaLock
                size={"1rem"}
                className="relative bottom-7 left-2 cursor-pointer text-gray-400 peer-focus:text-black"
                onClick={showPassword}
              />
            )}
          </div>
          <div className="text-sm lg:text-base">
            <input
              className="peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow"
              type={isLocked ? "text" : "password"}
              placeholder="Confirm Current Password"
              name="confirm_current_password"
              required
            />
            {isLocked ? (
              <FaLockOpen
                size={"1rem"}
                className="relative bottom-7 left-2 cursor-pointer text-gray-400 peer-focus:text-black"
                onClick={showPassword}
              />
            ) : (
              <FaLock
                size={"1rem"}
                className="relative bottom-7 left-2 cursor-pointer text-gray-400 peer-focus:text-black"
                onClick={showPassword}
              />
            )}
          </div>
          {/* Error message display */}
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          {/* Submit button */}
          <button type="submit" className="btn btn-primary text-white w-full">
            Update Email
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangeEmail;
