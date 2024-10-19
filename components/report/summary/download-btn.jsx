"use client";
import { DownloadTableExcel } from "react-export-table-to-excel";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

const Download_Stock_Summary = ({ tableRef, status }) => {
  return (
    <DownloadTableExcel
      filename="stock-summary"
      sheet="stock-summary"
      currentTableRef={tableRef?.current}
    >
      <button
        className={`flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 float-end mb-5 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500`}
        disabled={status === 404}
      >
        <AiOutlineDownload className="mr-2" />
        <span className="hidden lg:block"> Download </span>
      </button>
    </DownloadTableExcel>
  );
};

export default Download_Stock_Summary;
