import OpenItemListBtn from "@/components/ui/button/open-modal";
import InventoryForm from "@/components/ui/form/create-stock";
import InventoryTable from "@/components/stock/stock-table";
import React, { Fragment } from "react";
import AddStock from "@/components/ui/form/add-stock";
const page = () => {
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
        <main className="container m-auto bg-inherit shadow-lg min-4/6 h-auto max-h-5/6 p-5 overflow-hidden">
          <InventoryTable />
        </main>
      </div>
      {/* modal */}
      <AddStock /> {/* add stock   table */}
      <InventoryForm /> {/* Inventroy table */}
    </Fragment>
  );
};

export default page;
