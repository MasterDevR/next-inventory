"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaLockOpen, FaLock } from "react-icons/fa";
import axios from "axios";
import useInventoryStore from "@/components/store/store";
import ConfimModal from "@/components/ui/modal/confirm-modal";

const ChangePassword = () => {
  const modalRef = useRef();
  const {
    department_id,
    token,
    updateStatuss,
    updateModalMessage,
    updateSuccessModal,
  } = useInventoryStore();
  const [isMatched, setIsMatched] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [formData, setFormData] = useState(null);

  const showPassword = () => {
    setIsLocked(!isLocked);
  };

  const submitHandler = async (e) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/change-password/${department_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.status === 403) {
        setIsMatched(false);
      } else {
        updateStatuss(response.data.status);
        updateModalMessage(response.data.message);
        updateSuccessModal(true);
        setIsMatched(true);
      }
    } catch (error) {
      updateStatuss(403);
      updateModalMessage("Something went wrong.");
      updateSuccessModal(true);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormData(new FormData(e.target));
    modalRef.current.showModal();
    let form = e.target;
    form.reset();
  };

  const handleConfirm = (e) => {
    modalRef.current.close();
    submitHandler(e);
  };

  return (
    <>
      <ConfimModal modalRef={modalRef} onConfirm={handleConfirm} />
      <div className="bg-white container p-4 shadow-md rounded-md space-y-5 m-auto">
        <strong className="text-xl">Change Your Password</strong>
        <p className="text-sm">
          To ensure the security of your account please provide the following
          information to change your password:
        </p>
        <ul className="menu ">
          <li>
            <h2 className="menu-title">
              1. Enter your existing password to verify your identity.
            </h2>
            <h2 className="menu-title">
              2. New Password Choose a strong password that includes:
            </h2>
            <ul className="space-y-2 text-gray-400">
              <li>At least 8 characters A</li>
              <li>combination of uppercase and lowercase letters</li>
              <li>Numbers and special characters (e.g., !, @, #, $)</li>
            </ul>
            <h2 className="menu-title">
              3. Confirm New Password Re-enter your new password to ensure it
              matches.
            </h2>
          </li>
        </ul>
        <form onSubmit={handleFormSubmit} className="w-full space-y-5">
          <div className="text-sm lg:text-base">
            <input
              className={`peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow`}
              type={isLocked ? "text" : "password"}
              placeholder="Old Password"
              name="old_password"
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
          <div className=" text-sm lg:text-base">
            <input
              className={`peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow ${
                !isMatched && "border border-red-500"
              }`}
              type={isLocked ? "text" : "password"}
              placeholder="New Password"
              name="new_password"
              required
              min={8}
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
          <div className=" text-sm lg:text-base">
            <input
              className={`peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow ${
                !isMatched && "border border-red-500"
              }`}
              type={isLocked ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirm_password"
              required
              min={8}
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
          <button type="submit" className="btn btn-primary text-white w-full">
            Change Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
