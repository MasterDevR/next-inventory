"use client";
import React, { Fragment, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import NavBar from "../header/nav-bar";
import SideBar from "../side-bar/side-bar";
import useInventoryStore from "@/components/store/store";
import LoginForm from "../form/login-form";
import axios from "axios";
import AlertModal from "@/components/ui/modal/modal-message";
import CartModal from "@/components/ui/form/requisition-form";
const Wrapper = ({ children }) => {
  const {
    theme,
    showSideBar,
    updateTheme,
    updateRole,
    isSuccessModal,
    updateDepartmentId,
    updateToken,
  } = useInventoryStore();
  const { data: session, status } = useSession();

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
      const role = session?.user.Role.name;
      const id = session?.user.department_id;
      updateRole(role);
      updateDepartmentId(id);
      updateToken(token);
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
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="container h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <Fragment>
      <CartModal />
      {isSuccessModal === true && <AlertModal />}
      {session ? (
        <div
          className={`${
            theme !== true ? "text-black" : "text-white"
          } h-screen ${theme === true ? "bg-custom-bg" : "bg-white"}  `}
        >
          <NavBar />
          <main className={`h-full w-12/12  flex `}>
            <SideBar />
            <section
              className={` w-screen overflow-auto  ${
                showSideBar ? "absolute" : " relative"
              } lg:relative`}
            >
              <div className={`my-10 w-full m-auto h-screen p-5 text-inherit`}>
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
