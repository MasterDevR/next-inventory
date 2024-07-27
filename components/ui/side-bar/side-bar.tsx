"use client";
import Link from "next/link";
import React from "react";
import { adminLink } from "@/components/util/nav-link/admin";
import { usePathname } from "next/navigation";
import useInventoryStore from "@/components/store/store";
const SideBar = () => {
  const { showSideBar } = useInventoryStore();
  const pathname = usePathname();
  return (
    <aside
      className={`top-0 left-0 h-full shadow-2xl transition-all duration-300 ease-in-out z-40 lg:relative ${
        showSideBar ? "w-4/6  lg:w-2/12 absolute " : "w-0 lg:w-24 relative "
      } overflow-hidden bg-white`}
    >
      <div className="relative top-20 divide-y-2  ">
        {adminLink.map((item) => {
          return (
            <li
              key={item.name}
              className={`pl-5 ${
                pathname === item.href
                  ? "bg-slate-500  text-white font-bold"
                  : "bg-inherit"
              } menu menu-sm hover:bg-slate-500 bg-base-100hover:text-white   `}
            >
              <Link href={item.href} className="text-lg ">
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
