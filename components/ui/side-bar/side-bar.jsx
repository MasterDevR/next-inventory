"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { adminLink, loadingNavLink } from "@/components/util/nav-link/link";
import { usePathname } from "next/navigation";
import useInventoryStore from "@/components/store/store";
import { useSession } from "next-auth/react";
const SideBar = () => {
  const session = useSession();
  const { showSideBar, theme, role } = useInventoryStore();
  const pathname = usePathname();

  return (
    <aside
      className={`top-0 left-0 h-full shadow-sm shadow-gray-400 transition-all duration-300 ease-in-out z-40 lg:relative ${
        showSideBar ? "w-3/6  lg:w-2/12   " : "w-0 lg:w-24   "
      } overflow-hidden flex justify-center  bg-custom-bg-2`}
    >
      <div className="relative top-20 flex flex-col w-5/6 space-y-2">
        <ul className="space-y-2">
          {role !== "user" &&
            adminLink.map((item) => (
              <li
                data-tip={item.name}
                key={item.href}
                className={`${
                  pathname === item.href
                    ? "text-white font-bold bg-custom-bg-3"
                    : "text-gray-200"
                } ${
                  pathname.startsWith(`/${item.name.toLocaleLowerCase()}`) &&
                  "text-white font-bold bg-custom-bg-3"
                }
                menu menu-sm hover:bg-custom-bg-3 hover:text-white rounded-lg ${
                  !showSideBar && "tooltip self-center"
                }`}
              >
                <Link
                  href={`${item.href}`}
                  className={`${
                    !showSideBar ? "self-center" : "self-start"
                  } text-xs md:text-base`}
                >
                  <span>{item.icon}</span>
                  <span className={`${!showSideBar ? "hidden" : "block"}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}

          {session.status === "loading" && (
            <ul className="space-y-2">
              {loadingNavLink?.map((item, index) => (
                <li
                  key={index + item.titleHolder}
                  className="flex items-center gap-5"
                >
                  {item.iconHolder}
                  {item.titleHolder}
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
