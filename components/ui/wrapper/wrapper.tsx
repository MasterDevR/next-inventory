"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NavBar from "../header/nav-bar";
import { useRouter, usePathname } from "next/navigation";
import SideBar from "../side-bar/side-bar";
import useInventoryStore from "@/components/store/store";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  const { theme } = useInventoryStore();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.log("session : ", session);
    if (!session) {
      router.push("/auth");
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  // PageLayout
  return (
    <div className="h-screen" data-theme={`${theme ? "dark" : "light"}`}>
      {pathname !== "/auth" && <NavBar />}
      <main className="h-full w-12/12  flex ">
        {pathname !== "/auth" && <SideBar />}
        <section className=" w-screen overflow-auto bg-custom-bg">
          <div className="container mx-10 mt-5 mb-20 h-screen  ">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Wrapper;
