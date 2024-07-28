import OpenItemListBtn from "@/components/ui/button/open-modal";
import InventoryForm from "@/components/ui/form/inventory/inventory-form";
import React, { Fragment } from "react";

const page = () => {
  return (
    <Fragment>
      <div>
        <OpenItemListBtn title="Add Item" id="add-stock" />
      </div>
      <InventoryForm />
    </Fragment>
  );
};

export default page;
