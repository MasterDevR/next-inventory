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
  const { theme } = useInventoryStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }
  // PageLayout
  return (
    <Fragment>
      {session ? (
        <div className="h-screen" data-theme={`${theme ? "dark" : "light"}`}>
          <NavBar />
          <main className="h-full w-12/12  flex ">
            <SideBar />
            <section className={` w-screen overflow-auto  `}>
              <div
                className={`container m-auto mt-5 mb-20 h-screen shadow-white shadow-lg bg-blue-300 `}
              >
                {children}
              </div>
            </section>
          </main>
        </div>
      ) : (
        <LoginForm />
      )}
    </Fragment>
  );
};

export default Wrapper;
