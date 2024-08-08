"use client";
import useInventoryStore from "@/components/store/store";
import React from "react";
import { RxCross2 } from "react-icons/rx";

const HideModal = ({ modalRef }) => {
  const { updateSuccessModal } = useInventoryStore();
  const modalHandler = () => {
    try {
      if (modalRef.current) {
        modalRef.current.close();
      }
      updateSuccessModal(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button
      className="flex w-full justify-center rounded-lg border-2 border-red-500 p-2 text-red-500 transition-all delay-75 ease-in-out hover:bg-red-500 hover:text-white"
      onClick={modalHandler}
    >
      <RxCross2 size={"1.5rem"} className="block lg:hidden" />
      <span className="hidden lg:block">Close</span>
    </button>
  );
};

export default HideModal;
