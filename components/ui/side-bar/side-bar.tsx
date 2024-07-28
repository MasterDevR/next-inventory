"use client";
import Link from "next/link";
import React from "react";
import { adminLink } from "@/components/util/nav-link/admin";
import { usePathname } from "next/navigation";
import useInventoryStore from "@/components/store/store";
const SideBar = () => {
  const { showSideBar, theme } = useInventoryStore();
  const pathname = usePathname();
  return (
    <aside
      className={`top-0 left-0 h-full shadow-2xl transition-all duration-300 ease-in-out z-40 lg:relative ${
        showSideBar ? "w-4/6  lg:w-2/12   " : "w-0 lg:w-24   "
      } overflow-hidden flex justify-center ${
        theme === true ? "bg-custom-bg" : " bg-white"
      }`}
    >
      <div className="relative top-20 flex flex-col w-5/6 space-y-2">
        {adminLink.map((item) => {
          return (
            <li
              key={item.name}
              className={`  ${
                pathname === item.href
                  ? " text-white font-bold bg-slate-500 "
                  : "  text-gray-500 "
              } menu menu-sm hover:bg-slate-400   hover:text-white rounded-lg `}
            >
              <Link
                href={item.href}
                className={`${!showSideBar ? "self-center" : "self-start"} `}
              >
                {item.icon}
                <span className={`${!showSideBar ? "hidden " : "block"}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
