import OpenItemListBtn from "@/components/ui/button/open-modal";
import InventoryForm from "@/components/ui/form/inventory/inventory-form";
import EditItemModal from "@/components/ui/moda/edit-item-modal";
import InventoryTable from "@/components/ui/table/inventory-table";
import React, { Fragment } from "react";

const page = () => {
  return (
    <Fragment>
      <div className="h-full space-y-10">
        <div className="w-1/6 ">
          <OpenItemListBtn title="Add Item" id="add-stock" />
        </div>
        <main className="container m-auto bg-white shadow-lg rounded-3xl min-4/6 h-auto max-h-5/6 p-5 overflow-hidden">
          <InventoryTable />
        </main>
      </div>
      {/* modal */}
      <InventoryForm />
      <EditItemModal />
    </Fragment>
  );
};

export default page;
