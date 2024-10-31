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
    <div className="flex h-screen items-center justify-center bg-white md:bg-inherit ">
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-y-8 rounded-2xl bg-white p-10 md:w-8/12 md:shadow-xl">
        <div className="flex flex-col items-center gap-y-5">
          <Image
            src="/images/inventory.png"
            alt="Universidad_de_Manila_seal.png"
            width="0"
            height="0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            style={{ width: "100%", height: "auto" }}
          />
          <h1 className=" font-black text-green-950">UDM INVENTORY PORTAL</h1>
        </div>
        <form className="flex w-full flex-col gap-y-3" onSubmit={submitHandler}>
          <div>
            <input
              className={`peer w-full border p-2 pl-10 text-sm tracking-widest text-gray-700 lg:rounded lg:shadow`}
              id="username"
              type="text"
              placeholder="Username"
              name="userID"
            />
            <FaRegUserCircle
              size={"1.1rem"}
              className="relative bottom-7 left-2 text-gray-400 peer-focus:text-black"
            />
          </div>
          <div>
            <input
              className={`peer w-full appearance-none rounded border p-2 pl-10 text-sm tracking-widest text-gray-700 shadow`}
              type={isLocked ? "text" : "password"}
              id="password"
              placeholder="Password"
              name="password"
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
          <Link
            href="/forgot-password"
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <button
            type="submit"
            className={`cursor-pointer rounded-md border-2 bg-blue-700 p-2 font-bold tracking-widest text-white hover:bg-blue-500 ${
              !isLoading ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            {!isLoading ? "SIGN IN" : "Loading"}
          </button>
        </form>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
