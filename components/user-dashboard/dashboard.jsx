"use client";
import React from "react";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Transaction_List from "@/components/user-dashboard/transaction-list";
import useInventoryStore from "@/components/store/store";
const dashboard = () => {
  return (
    <div className="container m-auto  flex flex-col gap-10">
      <header>
        <Link
          href={"/available-item"}
          className="btn btn-success btn-outline float-end "
        >
          <span className="hidden lg:block"> Available Stock</span>
          <FaExternalLinkAlt size={"1rem"} />
        </Link>
      </header>
      <Transaction_List />
    </div>
  );
};

export default dashboard;
