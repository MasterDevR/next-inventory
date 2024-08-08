"use client";
import HideModal from "@/components/ui/button/hide-modal";
import React, { useRef } from "react";

const AddStockListTable = () => {
  const modalRef = useRef();
  return (
    <dialog id="stock-list-table" className="modal" ref={modalRef}>
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="w-fit relative float-end">
          <HideModal modalRef={modalRef} />
        </div>
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Click the button below to close</p>
        <div className="modal-action"></div>
      </div>
    </dialog>
  );
};

export default AddStockListTable;
