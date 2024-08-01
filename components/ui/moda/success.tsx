"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import HideModal from "../button/hide-modal";
import { IoIosWarning } from "react-icons/io";
import { FaCheckCircle } from "react-icons/fa";
type sucessProps = {
  message: string;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  status: number | undefined;
};
const SuccesModal = ({ message, setIsSuccess, status }: sucessProps) => {
  useEffect(() => {
    message;
  }, [message]);
  return (
    <dialog id="success" className="modal">
      <div className="modal-box">
        {status === 200 ? (
          <FaCheckCircle className="size-16 text-green-500 m-auto" />
        ) : (
          <IoIosWarning className="size-16 text-red-500 m-auto" />
        )}
        <h1
          className={`py-4 text-center text-md ${
            status === 200 ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </h1>
        <div className="modal-action">
          <form method="dialog">
            <HideModal id="my_modal_1" setIsSuccess={setIsSuccess} />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SuccesModal;
