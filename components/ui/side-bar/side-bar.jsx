"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {
  adminLink,
  loadingNavLink,
  department,
} from "@/components/util/nav-link/link";
import { usePathname } from "next/navigation";
import useInventoryStore from "@/components/store/store";
import { useSession } from "next-auth/react";
const SideBar = () => {
  const session = useSession();
  const { showSideBar, theme } = useInventoryStore();
  const pathname = usePathname();

  return (
    <aside
      className={`top-0 left-0 h-full shadow-2xl transition-all duration-300 ease-in-out z-40 lg:relative ${
        showSideBar ? "w-4/6  lg:w-2/12   " : "w-0 lg:w-24   "
      } overflow-hidden flex justify-center  ${
        theme === true ? "bg-custom-bg" : " bg-gray-100 "
      }`}
    >
      <div className="relative top-20 flex flex-col w-5/6 space-y-2 ">
        {(session.data.user.Role.name !== "department"
          ? adminLink
          : department
        ).map((item, index) => (
          <li
            data-tip={item.name}
            key={index}
            className={`${
              pathname === item.href
                ? "text-white font-bold bg-slate-500"
                : "text-gray-500"
            } menu menu-sm hover:bg-slate-400 hover:text-white rounded-lg ${
              !showSideBar && "tooltip self-center"
            }`}
          >
            <Link
              href={item.href}
              className={`${!showSideBar ? "self-center" : "self-start"}`}
            >
              {item.icon}
              <span className={`${!showSideBar ? "hidden" : "block"}`}>
                {item.name}
              </span>
            </Link>
          </li>
        ))}

        {session.status == "loading" &&
          loadingNavLink?.map((item, index) => {
            return (
              <li key={index} className="flex items-center gap-5">
                {item.iconHolder}
                {item.titleHolder}
              </li>
            );
          })}
      </div>
    </aside>
  );
};

export default SideBar;
