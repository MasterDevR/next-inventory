"use client";
import useInventoryStore from "@/components/store/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import UserIcon from "./user-icon";
import Username from "./username";
import { FaCartPlus } from "react-icons/fa";

const NavBar = () => {
  const { updateTheme, updateShowSideBar, theme, cartItem } =
    useInventoryStore();

  const sideBardHandler = () => {
    updateShowSideBar();
  };

  const updateThemeHandler = (e) => {
    if (e.target.checked) {
      localStorage.setItem("theme", "true");
      updateTheme(true);
    } else {
      localStorage.removeItem("theme");
      updateTheme(false);
    }
  };

  return (
    <div
      className={`navbar shadow-lg sticky top-0 z-50 ${
        theme === true ? "bg-custom-bg" : "bg-gray-100"
      }`}
    >
      <div className="flex-1">
        <button
          className=" cursor-pointer hover:bg-gray-500 hover:text-white ml-2 p-2 rounded-md transition-all ease-in-out duration-300 "
          onClick={sideBardHandler}
        >
          <MdMenuOpen className="text-inherit size-10 font-bold" />
        </button>
      </div>
      {/* user name */}
      <div
        className="text-inherit cursor-pointer hover:scale-125 transition-all duration-75 delay-750"
        onClick={() => {
          document.getElementById("cart-modal").showModal();
        }}
      >
        <FaCartPlus size={"1.7rem"} />
        <span className="relative bottom-2 right-4 text-red-500 font-bold">
          {cartItem.length}
        </span>
      </div>
      <Username />
      {/*  */}
      <div className="flex-none">
        <div className="dropdown dropdown-end  ">
          <UserIcon />
          <ul
            tabIndex={0}
            className={`${
              theme === true ? "bg-gray-600" : "bg-gray-300 "
            } menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow text-inherit`}
          >
            <li className="text-inherit">
              <Link href={"profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"setting"}>Settings</Link>
            </li>
            <li>
              <label className="label cursor-pointer space-x-4 ">
                Dark Mode
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  id="mode"
                  defaultChecked={theme}
                  onChange={updateThemeHandler}
                />
              </label>
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
