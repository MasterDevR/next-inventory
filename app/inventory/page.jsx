"use client";
import OpenItemListBtn from "@/components/ui/button/open-modal";
import InventoryForm from "@/components/ui/form/create-stock";
import InventoryTable from "@/components/stock/stock-table";
import React, { Fragment, useEffect } from "react";
import AddStock from "@/components/ui/form/add-stock";
import { redirect } from "next/navigation";
import useInventoryStore from "@/components/store/store";
const Page = () => {
  const { role } = useInventoryStore();
  useEffect(() => {
    if (role && role === "department") {
      return redirect("./not-found");
    }
  }, [role]);
  return (
    <Fragment>
      <div className="h-full space-y-10">
        <div className="flex flex-row gap-x-5 relative left-7">
          <div className="w-fit ">
            <OpenItemListBtn title="Create Stock" id="create-stock" />
          </div>
          <div className="w-fit">
            <OpenItemListBtn title="Add Stock" id="add-stock" />
          </div>
        </div>
        <main className=" m-auto bg-inherit shadow-lg   h-auto max-h-5/6 p-5 overflow-hidden">
          <InventoryTable />
        </main>
      </div>
      {/* modal */}
      <AddStock />
      <InventoryForm />
    </Fragment>
  );
};

export default Page;
