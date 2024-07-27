"use client";
import Link from "next/link";
import React from "react";
import { adminLink } from "@/components/util/nav-link/admin";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:block w-2/12 ">
      <div className="relative top-20 divide-y-2 ">
        {adminLink.map((item) => {
          return (
            <li
              key={item.name}
              className={`${
                pathname === item.href
                  ? "bg-slate-500  text-white font-bold"
                  : "bg-inherit"
              } menu menu-sm hover:bg-slate-500 bg-base-100hover:text-white w-full p-2   `}
            >
              <Link href={item.href} className="text-lg">
                {item.name}
              </Link>
            </li>
          );
        })}
      </div>
    </aside>
  );
};

export default SideBar;
