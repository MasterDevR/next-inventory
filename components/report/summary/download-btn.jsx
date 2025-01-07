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
      <button className={`btn btn-outline`} disabled={status === 404}>
        <AiOutlineDownload className="mr-2" />
        <span className="hidden lg:block"> Download </span>
      </button>
    </DownloadTableExcel>
  );
};

export default Download_Stock_Summary;
