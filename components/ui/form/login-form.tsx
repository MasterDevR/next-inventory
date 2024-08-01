"use client";
import React, { use, useEffect, useState } from "react";
import { FaLockOpen, FaLock, FaRegUserCircle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
const LoginForm = () => {
  const session = useSession();
  const pathname = usePathname();

  const router = useRouter();
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showPassword = () => {
    setIsLocked(!isLocked);
  };

  const submitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      if (isLoading) {
        return;
      } else {
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const userId = formData.get("userID");
        const password = formData.get("password");
        const result = await signIn("credentials", {
          username: userId,
          password: password,
          redirect: false,
        });

        console.log(result);
        console.log(session);
        // if (result?.error !== null) {
        //   return;
        // }
        // if (pathname !== "/") {
        //   router.push(pathname);
        // } else {
        //   router.push("/");
        // }
      }
    } catch (err) {
      console.log("Caught Errro : ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center ">
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
          <h1 className="text-2xl font-black tracking-widest text-green-950">
            UDM SYSTEM
          </h1>
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

export default LoginForm;
