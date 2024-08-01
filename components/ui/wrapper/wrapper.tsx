"use client";
import React, { Fragment, ReactNode, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import NavBar from "../header/nav-bar";
import SideBar from "../side-bar/side-bar";
import useInventoryStore from "@/components/store/store";
import LoginForm from "../form/login-form";
import axios from "axios";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const { theme, showSideBar, updateTheme } = useInventoryStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);

  useEffect(() => {
    const storage = localStorage.getItem("theme");
    if (storage) {
      document.getElementById("mode")?.setAttribute("checked", "true");
      updateTheme(true);
    } else {
      document.getElementById("mode")?.removeAttribute("checked");
      updateTheme(false);
    }
  }, [updateTheme]);

  useEffect(() => {
    const token = session?.user.accessToken;
    if (status === "authenticated" && token) {
      const checkToken = async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/validate-token`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // logout if token was invalidated on the server side
          if (response.data.status !== 200) {
            signOut();
          }
        } catch (error) {
          console.error("Error checking token:", error);
          signOut();
        }
      };

      checkToken();
    }
  }, [session, status, signOut]);

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
          } h-screen ${theme === true ? "bg-custom-bg" : "bg-gray-100"}  `}
        >
          <NavBar />
          <main className={`h-full w-12/12  flex `}>
            <SideBar />
            <section
              className={` w-screen overflow-auto ${
                showSideBar ? "absolute" : " relative"
              } lg:relative`}
            >
              <div
                className={`my-20 container  h-screen p-10 shadow-lx text-inherit rounded-3xl `}
                data-theme={`${theme === true ? "dim" : "light"}`}
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
