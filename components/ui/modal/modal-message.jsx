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

  const renderStockMessage = (message) => {
    if (modalStatus === 407) {
      return message.split(",").map((item, index) => {
        const [stockNo, available, requested] = item.trim().split(":");
        const isInsufficient = parseInt(requested) > parseInt(available);

        return (
          <div
            key={index}
            className="py-3 px-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col gap-2">
              {/* Stock Number */}
              <div className="font-medium text-gray-900">{stockNo}</div>

              {/* Quantities */}
              <div className="flex flex-col gap-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Approved Qty:</span>
                  <span
                    className={`font-medium ${
                      isInsufficient ? "text-red-600" : "text-gray-900"
                    }`}
                  >
                    {requested}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">On Hand Qty:</span>
                  <span className="font-medium text-gray-900">{available}</span>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }
    return message;
  };

  const getStatusConfig = () => {
    switch (modalStatus) {
      case 407:
        return {
          icon: <IoIosWarning className="size-12 text-red-500" />,
          textColor: "text-gray-900",
          titleText: "Insufficient Stock",
        };
      case 200:
        return {
          icon: <FaCheckCircle className="size-16 text-green-500 m-auto" />,
          textColor: "text-green-500",
          bgColor: "bg-green-50",
        };
      default:
        return {
          icon: <IoIosWarning className="size-16 text-yellow-500 m-auto" />,
          textColor: "text-yellow-500",
          bgColor: "bg-yellow-50",
        };
    }
  };

  const { icon, textColor, bgColor } = getStatusConfig();

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box max-w-md p-0 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            {icon}
            <h1 className="text-lg font-semibold text-gray-900">
              {modalStatus === 407 ? "Insufficient Stock" : modalMessage}
            </h1>
          </div>

          {modalStatus === 407 && (
            <div className="border rounded-lg divide-y divide-gray-100">
              {renderStockMessage(modalMessage)}
            </div>
          )}

          {modalStatus !== 407 && modalMessage && (
            <div className={`${bgColor} p-3 rounded-lg`}>{modalMessage}</div>
          )}
        </div>

        <div className="modal-action border-t p-4 bg-gray-50">
          <form method="dialog">
            <HideModal modalRef={modalRef} />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default React.memo(AlertModal);
