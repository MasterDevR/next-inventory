"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import EditItemModal from "../modal/edit-item-modal";

const EditBtn = ({ stock_no }) => {
  const modalRef = useRef();
  const [data, setData] = useState([]);

  const editHandler = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/edit-stock/${stock_no}`
    );
    setData(response.data?.data);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <Fragment>
      <div
        onClick={editHandler}
        className="w-4/6 bg-green-500 p-2 rounded-md hover:bg-green-600 text-center cursor-pointer"
      >
        Edit
      </div>
      <EditItemModal modalRef={modalRef} data={data} />
    </Fragment>
  );
};

export default EditBtn;
