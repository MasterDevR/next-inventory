"use client";
import React from "react";
import Admin_Transaction_Container from "@/components/transaction/admin/transaction-container";
import useInventoryStore from "@/components/store/store";
const Page = () => {
  const { role } = useInventoryStore();
  console.log(role);
  return (
    <div className=" ">
      {role && role !== "user" ? <Admin_Transaction_Container /> : <></>}
    </div>
  );
};

export default Page;
