"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import EditItemModal from "../modal/edit-item-modal";
import { FaEdit } from "react-icons/fa"; // Import the icon from react-icons

const EditBtn = ({ stock_no }) => {
  const modalRef = useRef();
  const [data, setData] = useState([]);

  const editHandler = async (event) => {
    event.stopPropagation();
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
        onClick={(event) => editHandler(event)}
        className="w-fit btn btn-primary btn-sm flex items-center btn-outline" // Add flex and items-center for alignment
      >
        <FaEdit className="mr-2" /> {/* Add the icon with some margin */}
        <span className="hidden md:block">Edit</span>
      </div>
      <EditItemModal modalRef={modalRef} data={data} />
    </Fragment>
  );
};

export default EditBtn;
