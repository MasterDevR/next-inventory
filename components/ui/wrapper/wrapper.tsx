"use client";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NavBar from "../header/nav-bar";
import { useRouter, usePathname } from "next/navigation";
import SideBar from "../side-bar/side-bar";
import useInventoryStore from "@/components/store/store";
import LoginForm from "../form/login-form";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const { theme, showSideBar } = useInventoryStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // useEffect(() => {
  //   console.log(pathname);
  // }, [pathname]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  // PageLayout
  return (
    <Fragment>
      {session ? (
        <div
          className={`${
            theme !== true ? "text-black" : "text-white"
          } h-screen ${theme === true ? "bg-custom-bg" : "bg-white"}  `}
        >
          <NavBar />
          <main className={`h-full w-12/12  flex  `}>
            <SideBar />
            <section
              className={` w-screen overflow-auto ${
                showSideBar ? "absolute" : " relative"
              } lg:relative`}
            >
              <div
                className={`container m-auto mt-5 mb-20 h-screen   shadow-lg text-inherit `}
                data-theme={`${theme === true ? "dim" : "pastel"}`}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div className="bg-white dark:bg-custom-bg w-screen h-screen">
          <LoginForm />
        </div>
      )}
    </Fragment>
  );
};

export default Wrapper;
