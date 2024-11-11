"use client";
import useInventoryStore from "@/components/store/store";
import React from "react";
import HideModal from "../button/hide-modal";
const FormModal = ({ children, id, modalRef }) => {
  const { theme } = useInventoryStore();
  return (
    <dialog id={id} className="modal" ref={modalRef}>
      <div className={`modal-box max-w-5xl bg-gray-50`}>
        <div className="w-fit relateive ml-auto">
          <HideModal modalRef={modalRef} />
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default FormModal;
