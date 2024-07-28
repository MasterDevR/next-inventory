"use client";
import useInventoryStore from "@/components/store/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
const NavBar = () => {
  const { updateTheme, updateShowSideBar, theme } = useInventoryStore();
  const session = useSession();

  // useEffect(() => {
  //   console.log(session.data?.user);
  // }, [session]);
  const sideBardHandler = () => {
    updateShowSideBar();
  };
  return (
    <div className="navbar shadow-lg sticky top-0 z-50 bg-inherit">
      <div className="flex-1">
        <button
          className=" cursor-pointer hover:bg-gray-500 hover:text-white ml-2 p-2 rounded-md transition-all ease-in-out duration-300 "
          onClick={sideBardHandler}
        >
          <MdMenuOpen className="text-inherit size-10 font-bold" />
        </button>
      </div>
      {/* user name */}
      <h1 className="mx-5 font-bold tracking-widest text-inherit uppercase">
        {session.data?.user.department}
        {session.data?.user.deptCode}
      </h1>
      {/*  */}
      <div className="flex-none">
        <div className="dropdown dropdown-end  ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {/* user image */}

            <div className="w-10 rounded-full">
              <Image
                height={50}
                width={50}
                alt="Tailwind CSS Navbar component"
                src="/images/inventory.png"
              />
            </div>
          </div>
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
              <label
                className="label cursor-pointer space-x-4 "
                onClick={() => {
                  updateTheme();
                }}
              >
                Dark Mode
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  defaultChecked={false}
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
