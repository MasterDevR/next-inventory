import React, { Fragment, useRef, useState } from "react";

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
        className="w-4/6 bg-red-500 p-2 rounded-md hover:bg-red-600"
        onClick={(event) => deleteHandler(event)}
      >
        Delete
      </button>

      <VerifyActionModal stock_no={stock_no} id={id} modalRef={modalRef} />
    </Fragment>
  );
};

export default React.memo(DeleteStock);
