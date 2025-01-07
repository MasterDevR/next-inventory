"use client";
import { DownloadTableExcel } from "react-export-table-to-excel";
import React, { useRef, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";

const MonthlyExpensesTable = ({ data, setYear }) => {
  const tableRef = useRef(null);
  // Create a function to calculate total expenses for a given month
  const getMonthlyTotal = (transactions, monthIndex) => {
    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.created_at);
      if (transactionDate.getMonth() === monthIndex) {
        return total + transaction.total_price_per_transaction;
      }
      return total;
    }, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex justify-between w-full">
        {data && (
          <DownloadTableExcel
            filename="monthly-expenses"
            sheet="monthly-expenses"
            currentTableRef={tableRef.current}
          >
            <button className="btn btn-outline flex items-center gap-2">
              <AiOutlineDownload className="w-4 h-4" /> Download
            </button>
          </DownloadTableExcel>
        )}

        {/* select button */}
        <select
          className="btn btn-outline w-fit"
          onChange={(e) => setYear(e.target.value)}
        >
          {data &&
            data?.year?.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      <table
        ref={tableRef}
        className="table-auto w-full border-collapse border border-gray-300 "
      >
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Department</th>
            {/* Skeleton headers for full month names from January to December */}
            {[...Array(12)].map((_, index) => (
              <th key={index} className="p-2 border border-gray-300">
                <div className="animate-pulse h-4 w-full flex items-center justify-center">
                  {
                    [
                      "January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December",
                    ][index]
                  }
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.status === 200 &&
            data?.transactions.map((transactionData, index) => (
              <tr key={transactionData.department_id + index}>
                <td className="p-2 border border-gray-300">
                  {transactionData.department}
                </td>
                {[...Array(12)].map((_, monthIndex) => (
                  <td
                    key={monthIndex}
                    className="p-2 border border-gray-300 text-center"
                  >
                    {getMonthlyTotal(transactionData.transaction, monthIndex) ||
                      0}
                  </td>
                ))}
              </tr>
            ))}
          {data && data.status === 404 && (
            <tr>
              <td
                colSpan="13"
                className="p-2 border border-gray-300 text-center"
              >
                {`No Monthly Expenses Found on year  ${data.year}`}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(MonthlyExpensesTable);
