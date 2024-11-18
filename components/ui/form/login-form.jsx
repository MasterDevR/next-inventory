"use client";
import React, { useState } from "react";
import { FaLockOpen, FaLock, FaRegUserCircle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showPassword = () => {
    setIsLocked(!isLocked);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    if (isLoading) return;

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const userId = formData.get("userID");
      const password = formData.get("password");

      const result = await signIn("credentials", {
        username: userId,
        password: password,
        redirect: false,
      });

      if (result.error) {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-y-8 rounded-lg bg-white p-10 shadow-md">
        <div className="flex flex-col items-center gap-y-5">
          <Image
            src="/images/inventory.png"
            alt="Inventory Logo"
            width="150"
            height="150"
            priority
            className="rounded-full"
          />
          <h1 className="text-xl font-semibold text-gray-800 text-center">
            Supply and Materials Inventory System
          </h1>
          <p className="text-md text-gray-600">Please sign in to continue</p>
        </div>
        <form className="flex w-full flex-col gap-y-4" onSubmit={submitHandler}>
          <div className="relative">
            <input
              className={`peer w-full border-b-2 border-gray-300 p-2 pl-10 text-sm text-gray-700 focus:border-gray-500 focus:outline-none`}
              id="username"
              type="text"
              placeholder="Username"
              name="userID"
            />
            <FaRegUserCircle
              size={"1rem"}
              className="absolute top-2 left-2 text-gray-400"
            />
          </div>
          <div className="relative">
            <input
              className={`peer w-full border-b-2 border-gray-300 p-2 pl-10 text-sm text-gray-700 focus:border-gray-500 focus:outline-none`}
              type={isLocked ? "text" : "password"}
              id="password"
              placeholder="Password"
              name="password"
            />
            {isLocked ? (
              <FaLockOpen
                size={"1rem"}
                className="absolute top-2 left-2 text-gray-400 cursor-pointer"
                onClick={showPassword}
              />
            ) : (
              <FaLock
                size={"1rem"}
                className="absolute top-2 left-2 text-gray-400 cursor-pointer"
                onClick={showPassword}
              />
            )}
          </div>
          <Link
            href="/forgot-password"
            className="mt-2 text-sm text-gray-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className={`mt-4 cursor-pointer rounded-md border-2 border-gray-300 bg-gray-800 p-2 font-bold text-white transition duration-300 hover:bg-gray-700 ${
              !isLoading ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            {!isLoading ? "SIGN IN" : "Loading..."}
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
