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
    <div className="space-y-10 w-full  ">
      <div className="w-1/6">
        <OpenItemListBtn id="create-user" title="ADD USER" />
      </div>
      <main className="md:w-4/6 lg:w-full shadow-sm shadow-gray-400 self-center bg-inherit min-h-96">
        <DepartmentTable />
      </main>
      <CreateUserForm />
    </div>
  );
};

export default Page;
