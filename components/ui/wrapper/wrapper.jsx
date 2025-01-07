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
import { usePathname } from "next/navigation";
// import { disableDevTools } from "@/components/util/disableDevTools";
import ActivityTracker from "@/components/util/provider/activity-tracker";
const Wrapper = ({ children }) => {
  const pathname = usePathname();

  // useEffect(() => {
  //   if (process.env.NODE_ENV === "production") {
  //     disableDevTools();
  //   }
  // }, []);
  const {
    showSideBar,
    updateRole,
    isSuccessModal,
    updateDepartmentId,
    updateToken,
    role,
    updateDepartment,
    updateRequestorType,
    updateDepartmentCode,
  } = useInventoryStore();
  const { data: session, status } = useSession();

  useEffect(() => {
    const token = session?.user.accessToken;
    if (status === "authenticated" && token) {
      const role = session?.user.role;
      const id = session?.user.department_id;
      const department = session?.user.department;
      const code = session?.user.department_code;
      updateDepartmentCode(code);
      updateDepartment(department);
      updateRole(role);
      updateDepartmentId(id);
      updateToken(token);
      updateRequestorType(session?.user.Requestor_type?.name);
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
          if (response.data.status !== 200) {
            signOut();
          }
        } catch (error) {
          signOut();
        }
      };
      checkToken();
    }
  }, [session, status]);

  if (status === "loading") {
    return (
      <div className="container h-screen flex justify-center items-center m-auto">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }
  if (!session && pathname !== "/forgot-password") {
    return (
      <div className="dark:bg-custom-bg w-screen h-screen">
        <LoginForm />
      </div>
    );
  }

  return (
    <Fragment>
      <ActivityTracker />
      <CartModal />
      {isSuccessModal && <AlertModal />}
      {session ? (
        <div className="h-screen">
          <NavBar />
          <main className="h-full w-12/12 flex">
            {role && role !== "user" && <SideBar />}
            <section
              className={`w-screen overflow-auto ${
                showSideBar ? "absolute" : "relative"
              } lg:relative`}
            >
              <div className="my-10 w-full m-auto h-screen p-5 text-inherit  ">
                {children}
              </div>
            </section>
          </main>
        </div>
      ) : (
        <Fragment>{children}</Fragment>
      )}
    </Fragment>
  );
};

export default Wrapper;
