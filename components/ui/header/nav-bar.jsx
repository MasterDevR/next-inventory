"use client";
import useInventoryStore from "@/components/store/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import UserIcon from "./user-icon";
import Username from "./username";
import Notification from "./notification";
import Cart from "./cart";
import ToggleSideBar from "./toggle-side-bar";

const NavBar = () => {
  const { updateTheme, theme } = useInventoryStore();

  return (
    <div
      className={`navbar shadow-sm shadow-gray-400 sticky top-0 z-50 ${
        theme === true ? "bg-custom-bg" : "bg-custom-bg-2"
      }`}
    >
      <ToggleSideBar />
      <Cart />
      <Notification />
      {/* <Username /> */}
      <div className="flex-none">
        <div className="dropdown dropdown-end  ">
          <UserIcon />
          <ul
            tabIndex={0}
            className={`bg-base-100 menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-inherit`}
          >
            <li className="text-inherit">
              <Link href={"profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"setting"}>Settings</Link>
            </li>

            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
