import React from "react";
import HideModal from "../button/hide-modal";

const ConfimModal = ({ modalRef, onConfirm }) => {
  return (
    <dialog id="my_modal_3" className="modal" ref={modalRef}>
      <div className="modal-box space-y-5">
        <div role="alert" className="alert flex flex-col">
          <div className="w-fit relative ml-auto">
            <HideModal modalRef={modalRef} />
          </div>
          <span>Are you sure you want to change your password?</span>
          <div className="space-x-5">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onConfirm()}
            >
              Yes
            </button>
            <button
              className="btn btn-sm btn-error btn-outline"
              onClick={() => modalRef.current.close()}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ConfimModal;
