"use client";
import React from "react";
import Admin_Transaction_Container from "@/components/transaction/admin/transaction-container";
import useInventoryStore from "@/components/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const Page = () => {
  const { role } = useInventoryStore();
  const router = useRouter();

  useEffect(() => {
    if (role && role === "user") {
      router.push("/");
    }
  }, [role, router]);
  return (
    <div className=" ">
      {role && role !== "user" ? <Admin_Transaction_Container /> : <></>}
    </div>
  );
};

export default Page;
