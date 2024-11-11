import React, { Fragment, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";

import VerifyActionModal from "../modal/modal-verify-action";

const DeleteStock = ({ stock_no, id }) => {
  const modalRef = useRef();

  const deleteHandler = (event) => {
    event.stopPropagation();

    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <Fragment>
      <button
        className="w-fit btn btn-error btn-sm flex items-center btn-outline"
        onClick={(event) => deleteHandler(event)}
      >
        <FaTrash className="mr-2" />
        <span className="hidden md:block">Delete</span>
      </button>

      <VerifyActionModal stock_no={stock_no} id={id} modalRef={modalRef} />
    </Fragment>
  );
};

export default React.memo(DeleteStock);
