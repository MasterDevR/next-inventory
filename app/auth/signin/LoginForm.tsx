"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { FaLockOpen, FaLock, FaRegUserCircle } from "react-icons/fa";
import LoginFormImage from "./login-form-image";
import { signIn } from "next-auth/react";
const Page = () => {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { status } = useSession();
  const showPassword = () => {
    setIsLocked(!isLocked);
  };

  useEffect(() => {
    console.log(status);
  }, [status]);
  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      if (isLoading) {
        return;
      } else {
        console.log("adsfas");
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const userId = formData.get("userID");
        const password = formData.get("password");
        const result = await signIn("credentials", {
          username: userId,
          password: password,
          redirect: false,
        });

        if (result?.error !== null) {
          alert("Invalid Credentials.");
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.log("Caught Errro : ", err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white md:bg-zinc-50">
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-y-8 rounded-2xl bg-white p-10 md:w-8/12 md:shadow-xl">
        <LoginFormImage />
        <form className="flex w-full flex-col gap-y-3" onSubmit={submitHandler}>
          <div>
            <input
              className={`peer w-full border p-2 pl-10 text-sm tracking-widest text-gray-700 lg:rounded lg:shadow`}
              id="username"
              type="text"
              placeholder="Username"
              name="userID"
              defaultValue={"000-000-000"}
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
              defaultValue={"password"}
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
          <button
            type="submit"
            className={`cursor-pointer rounded-md border-2 bg-blue-700 p-2 font-bold tracking-widest text-white hover:bg-blue-500 ${
              !isLoading ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            {!isLoading ? "SIGN IN" : "Loading"}
          </button>
        </form>
      </div>
      {/* {isError.status !== undefined && <ToastWrapper isError={isError} />} */}
    </div>
  );
};

export default Page;
