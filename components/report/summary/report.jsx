"use client";
import React, { useState, useRef, useEffect } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "../../store/store";
import DownLoad_Stock_Summary from "./download-btn";
import Table_Caption from "./header";
import { useQueryClient } from "@tanstack/react-query";

const InventoryTable = () => {
  const queryClient = useQueryClient();
  const tableRef = useRef(null);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
  const { token, role } = useInventoryStore();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);
  const months = [
    { value: 1, name: "January" },
    { value: 2, name: "February" },
    { value: 3, name: "March" },
    { value: 4, name: "April" },
    { value: 5, name: "May" },
    { value: 6, name: "June" },
    { value: 7, name: "July" },
    { value: 8, name: "August" },
    { value: 9, name: "September" },
    { value: 10, name: "October" },
    { value: 11, name: "November" },
    { value: 12, name: "December" },
  ];

  const { data, isError, isLoading } = useFetchData({
    path: `/admin/stock-summary/${selectedYear}/${selectedMonth}`,
    token: token,
    key: `stock-summary-${selectedYear}-${selectedMonth}`,
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["stock-summary"] });
  }, [selectedYear, selectedMonth, queryClient]);

  const handleYearChange = (e) => {
    setSelectedYear(Number(e.target.value));
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const totalColumns = data?.purchaseNo?.length * 3 + 8;

  return (
    <div className="bg-white p-4 pb-52 overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        {!isError && role === "staff" && (
          <DownLoad_Stock_Summary
            tableRef={tableRef}
            status={data && data.status}
          />
        )}

        {isLoading ? (
          <div className="flex space-x-2">
            <div className="skeleton h-10 w-32"></div>
            <div className="skeleton h-10 w-32"></div>
          </div>
        ) : (
          !isError && (
            <div className="flex space-x-2">
              <select
                className="p-2 border rounded"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className="p-2 border rounded"
                value={selectedMonth}
                onChange={handleMonthChange}
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.name}
                  </option>
                ))}
              </select>
            </div>
          )
        )}
      </div>

      {isLoading ? (
        <div className="skeleton h-32 w-full"></div>
      ) : isError ? (
        <div className="text-red-600 text-center">
          <p>Error fetching data. Please try again later.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="table-auto border-collapse w-full text-center"
            ref={tableRef}
          >
            <thead>
              <Table_Caption
                data={data}
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                monthName={months[selectedMonth - 1].name}
              />
              <tr className="border-2 border-black ">
                <th
                  rowSpan={3}
                  className="align-middle border-r-2 border-black"
                >
                  No
                </th>
                <th
                  rowSpan={3}
                  className="align-middle  border-r-2 border-black"
                >
                  Item Description
                  <br />
                  <span className="font-normal  border-r-2 border-black">
                    Office Supply
                  </span>
                </th>
                <th colSpan={data?.purchaseNo?.length || 1}>Stock on Hand</th>
                <th
                  rowSpan={3}
                  colSpan={1}
                  className="w-20  border-r-2 border-black"
                >
                  Total Quantity On Hand
                </th>
                <th
                  colSpan={data?.purchaseNo?.length || 1}
                  className=" border-r-2 border-black"
                >
                  Quantity Issued
                </th>
                <th
                  colSpan={data?.purchaseNo?.length || 1}
                  className=" border-r-2 border-black"
                >
                  Unit Cost (Php)
                </th>
                <th rowSpan={3} className="w-20 border-r-2 border-black">
                  Total Cost (Php)
                </th>
                <th rowSpan={3} className="w-20 border-r-2 border-black">
                  Balance on Hand
                </th>
              </tr>
              <tr>
                <th
                  colSpan={data?.purchaseNo?.length || 1}
                  className="border-r-2 border-black"
                >
                  Purchase Order Number
                </th>
                <th
                  colSpan={data?.purchaseNo?.length || 1}
                  className="border-r-2 border-black"
                >
                  Purchase Order Number
                </th>
                <th
                  colSpan={data?.purchaseNo?.length || 1}
                  className="border-r-2 border-black"
                >
                  Purchase Order Number
                </th>
              </tr>
              <tr className="border-2 border-black">
                {data?.purchaseNo?.map((number, index) => (
                  <th key={index} className="border-r-2 border-black">
                    {number}
                  </th>
                ))}
                {data?.purchaseNo?.map((number, index) => (
                  <th key={index} className="border-r-2 border-black">
                    {number}
                  </th>
                ))}
                {data?.purchaseNo?.map((number, index) => (
                  <th key={index} className="border-r-2 border-black">
                    {number}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data && data.status !== 404 ? (
                selectedMonth > currentMonth ? (
                  // calculate the total number of colls
                  <tr className=" text-center border border-black">
                    <td
                      className="text-red-600 font-bold text-center"
                      colSpan={totalColumns}
                    >
                      There are no transactions yet for this month.
                    </td>
                  </tr>
                ) : (
                  data.groupedData?.map((item, index) => {
                    const totalCost = item.price.reduce((acc, price, idx) => {
                      const quantityIssued = item.quantity_issued[idx] || 0;
                      return acc + price * quantityIssued;
                    }, 0);
                    // const totalStockOnHand = item.stock_on_hand.reduce(
                    //   (acc, stock) => acc + stock,
                    //   0
                    // );

                    return (
                      <tr key={index}>
                        <td className="border border-black">{index + 1}</td>
                        <td className="border border-black">
                          {item && item.description}
                        </td>
                        {data.purchaseNo.map((poNumber, idx) => {
                          const stockIndex =
                            item &&
                            item.purchase_order_numbers.indexOf(poNumber);
                          return (
                            <td
                              className="border border-black"
                              key={`stock-${index}-${idx}`}
                            >
                              {stockIndex !== -1
                                ? item.initial_qty[stockIndex] === 0
                                  ? ""
                                  : item.initial_qty[stockIndex]
                                : ""}
                            </td>
                          );
                        })}
                        <td className="border border-black">
                          {item.initial_qty.reduce((acc, qty) => acc + qty, 0)}
                        </td>
                        {data.purchaseNo.map((poNumber, idx) => {
                          const issuedIndex =
                            item &&
                            item.purchase_order_numbers.indexOf(poNumber);
                          return (
                            <td
                              className="border border-black"
                              key={`issued-${index}-${idx}`}
                            >
                              {issuedIndex !== -1
                                ? item.quantity_issued[issuedIndex] === 0
                                  ? ""
                                  : item.quantity_issued[issuedIndex]
                                : ""}
                              {/* {issuedIndex !== -1
                              ? item.quantity_issued[issuedIndex]
                              : ""} */}
                            </td>
                          );
                        })}
                        {data.purchaseNo.map((poNumber, idx) => {
                          const priceIndex =
                            item.purchase_order_numbers.indexOf(poNumber);
                          return (
                            <td
                              className="border border-black"
                              key={`price-${index}-${idx}`}
                            >
                              {priceIndex !== -1
                                ? item.price[priceIndex].toFixed(2)
                                : ""}
                            </td>
                          );
                        })}
                        <td className="border border-black">
                          {totalCost.toFixed(2)}
                        </td>
                        <td className="border border-black">
                          {item && item.qty}
                        </td>
                      </tr>
                    );
                  })
                )
              ) : (
                <tr>
                  <td className="border border-black" colSpan={8}>
                    {`No Stock Summary for ${
                      months[selectedMonth - 1].name
                    } ${selectedYear}`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
