"use client";
import useInventoryStore from "@/components/store/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import UserIcon from "./user-icon";
import Notification from "./notification";
import Cart from "./cart";
import ToggleSideBar from "./toggle-side-bar";
import HomeBtn from "@/components/ui/button/home-btn";
import { usePathname } from "next/navigation";
const NavBar = () => {
  const pathname = usePathname();
  const { role, department } = useInventoryStore();
  return (
    <div
      className={`navbar shadow-sm border bg-gray-50 sticky top-0 z-50 ${
        role && role === "user" && "justify-between"
      } `}
    >
      {role && role !== "user" && <ToggleSideBar />}

      {role && role === "user" && <HomeBtn />}
      <aside>
        {role && role === "user" && <Cart />}

        <Notification />
        {/* <Username /> */}
        <div className="flex-none">
          <div className="dropdown dropdown-end  ">
            <UserIcon />
            <ul
              tabIndex={0}
              className={`bg-base-100 menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-inherit`}
            >
              <li>
                <Link href={"setting"}>Settings</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default NavBar;
