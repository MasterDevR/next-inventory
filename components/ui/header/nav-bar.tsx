"use client";
import useInventoryStore from "@/components/store/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { MdMenuOpen } from "react-icons/md";
const NavBar = () => {
  const { updateTheme, updateShowSideBar } = useInventoryStore();
  const { data: session } = useSession();

  const sideBardHandler = () => {
    updateShowSideBar();
  };
  return (
    <div className="navbar shadow-lg sticky top-0 z-50">
      <div className="flex-1">
        <MdMenuOpen
          size={"1.5rem"}
          className="ml-5"
          onClick={sideBardHandler}
        />
      </div>
      {/* user name */}
      <h1 className="mx-5 font-bold tracking-widest">
        {session?.user?.department}
      </h1>

      {/*  */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"profile"}>Profile</Link>
            </li>
            <li>
              <Link href={"setting"}>Settings</Link>
            </li>
            <li>
              <label
                className="label cursor-pointer space-x-4"
                onClick={() => {
                  updateTheme();
                }}
              >
                <span className="label-text">Dark Mode </span>
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  defaultChecked
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
