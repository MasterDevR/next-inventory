import OpenItemListBtn from "@/components/ui/button/open-modal";
import InventoryForm from "@/components/ui/form/create-stock";
import StockListModal from "@/components/stock/stock-list/stock-list-modal";
import InventoryTable from "@/components/stock/stock-table";
import React, { Fragment } from "react";
import AddStock from "@/components/ui/form/add-stock";
import AddStockListTable from "@/components/stock/add-stock/add-stock-list-table";
const page = () => {
  return (
    <Fragment>
      <div className="h-full space-y-10">
        <div className="flex flex-row gap-x-5">
          <div className="w-fit">
            <OpenItemListBtn title="Create Stock" id="create-stock" />
          </div>
          <div className="w-fit">
            <OpenItemListBtn title="Add Stock" id="add-stock" />
          </div>
        </div>
        <main className="container m-auto bg-inherit shadow-lg rounded-3xl min-4/6 h-auto max-h-5/6 p-5 overflow-hidden">
          <InventoryTable />
        </main>
      </div>
      {/* modal */}
      <AddStockListTable /> {/* add stock list table */}
      <AddStock /> {/* add stock   table */}
      <InventoryForm /> {/* Inventroy table */}
      <StockListModal /> {/* Inventroy list table */}
    </Fragment>
  );
};

export default page;
