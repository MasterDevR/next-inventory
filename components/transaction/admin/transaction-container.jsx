"use client";
import React from "react";
import Transaction_item from "./transaction-item";
import Transaction_details_modal from "@/components/ui/modal/transactio-details-modal";
const Admin_Transaction_Container = () => {
  return (
    <div className="w-full   rounded-lg  m-auto">
      <Transaction_item />
      <Transaction_details_modal />
    </div>
  );
};

export default Admin_Transaction_Container;
