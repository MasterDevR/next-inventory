"use client";
import OpenItemListBtn from "@/components/ui/button/open-modal";
import CreateUserForm from "@/components/ui/form/create-user";
import DepartmentTable from "@/components/department/department-table";
import React from "react";

const Page = () => {
  return (
    <div className="space-y-10 w-full  ">
      <div className="w-1/6">
        <OpenItemListBtn id="create-user" title="ADD USER" />
      </div>
      <main className="md:w-4/6 lg:w-full shadow-xl rounded-xl self-center bg-inherit">
        <DepartmentTable />
      </main>
      <CreateUserForm />
    </div>
  );
};

export default Page;
