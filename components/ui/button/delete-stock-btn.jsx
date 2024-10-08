import React, { Fragment, useRef, useState } from "react";

import VerifyAction from "@/components/ui/modal/modal-verify-action";
const DeleteStock = ({ stock_no, id }) => {
  const modalRef = useRef(null);

  const deleteHandler = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <Fragment>
      <button
        className="w-4/6 bg-red-500 p-2 rounded-md hover:bg-red-600"
        onClick={deleteHandler}
      >
        Delete
      </button>

      <VerifyAction stock_no={stock_no} id={id} modalRef={modalRef} />
    </Fragment>
  );
};

export default React.memo(DeleteStock);
