"use client";
import OpenItemListBtn from "@/components/ui/button/open-modal";
import CreateUserForm from "@/components/ui/form/create-user";
import DepartmentTable from "@/components/department/department-table";
import React, { useEffect } from "react";
import useInventoryStore from "@/components/store/store";
import { redirect } from "next/navigation";
const Page = () => {
  const { role } = useInventoryStore();
  useEffect(() => {
    if (role && role === "user") {
      return redirect("./not-found");
    }
  }, [role]);
  return (
    <div className="space-y-10 w-full text-xs lg:text-base">
      <main className="container m-auto self-center bg-inherit min-h-96 bg-white p-4 shadow-lg rounded-xl space-y-10">
        <div className="w-fit">
          <OpenItemListBtn id="create-user" title="ADD USER" />
        </div>
        <DepartmentTable />
      </main>
      <CreateUserForm />
    </div>
  );
};

export default Page;
