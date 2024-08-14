"use client";
import React, { useEffect, useRef } from "react";
import HideModal from "../button/hide-modal";
import { IoIosWarning } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
import useInventoryStore from "@/components/store/store";

const AlertModal = () => {
  const { modalMessage, modalStatus } = useInventoryStore();
  const modalRef = useRef();

  useEffect(() => {
    if (modalRef.current) {
      if (modalStatus !== undefined) {
        modalRef.current.showModal();
      }
    }
  }, [modalStatus, modalMessage]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        {modalStatus &&
        modalStatus >= 200 &&
        modalStatus &&
        modalStatus < 300 ? (
          <FaCheckCircle className="size-16 text-green-500 m-auto" />
        ) : (
          <IoIosWarning className="size-16 text-red-500 m-auto" />
        )}
        <h1
          className={`py-4 text-center text-md ${
            modalStatus &&
            modalStatus >= 200 &&
            modalStatus &&
            modalStatus < 300
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {modalMessage}
        </h1>
        <div className="modal-action">
          <form method="dialog">
            <HideModal modalRef={modalRef} />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default React.memo(AlertModal);
