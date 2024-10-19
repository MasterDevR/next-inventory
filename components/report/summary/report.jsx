"use client";
import React, { useState, useRef } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "../../store/store";
import DownLoad_Stock_Summary from "./download-btn";
import Table_Caption from "./header";

const InventoryTable = () => {
  const tableRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const { token, role } = useInventoryStore();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

  const { data, isError, isLoading } = useFetchData({
    path: `/admin/stock-summary/${selectedYear}`,
    token: token,
    key: `stock-summary-${selectedYear}`,
  });

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        {!isError && role === "staff" && (
          <DownLoad_Stock_Summary
            tableRef={tableRef}
            status={data && data.status}
          />
        )}

        {isLoading ? (
          <div className="skeleton h-10 w-32"></div>
        ) : (
          !isError && (
            <select
              className="p-2 border rounded"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
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
        <table
          className="table-auto border-collapse w-full text-center"
          ref={tableRef}
        >
          <thead>
            <Table_Caption data={data} />
            <tr>
              <th rowSpan={3} className="align-middle">
                No
              </th>
              <th rowSpan={3} className="align-middle">
                Item Description
                <br />
                <span className="font-normal">Office Supply</span>
              </th>
              <th colSpan={data?.purchaseNo?.length || 1}>Stock on Hand</th>
              <th rowSpan={3} colSpan={1} className="w-20">
                Total Quantity On Hand
              </th>
              <th colSpan={data?.purchaseNo?.length || 1}>Quantity Issued</th>
              <th colSpan={data?.purchaseNo?.length || 1}>Unit Cost (Php)</th>
              <th rowSpan={3} className="w-20">
                Total Cost (Php)
              </th>
              <th rowSpan={3} className="w-20">
                Balance on Hand
              </th>
            </tr>
            <tr className="border">
              <th colSpan={data?.purchaseNo?.length || 1}>
                Purchase Order Number
              </th>
              <th colSpan={data?.purchaseNo?.length || 1}>
                Purchase Order Number
              </th>
              <th colSpan={data?.purchaseNo?.length || 1}>
                Purchase Order Number
              </th>
            </tr>
            <tr>
              {data?.purchaseNo?.map((number, index) => (
                <th key={index}>{number}</th>
              ))}
              {data?.purchaseNo?.map((number, index) => (
                <th key={index}>{number}</th>
              ))}
              {data?.purchaseNo?.map((number, index) => (
                <th key={index}>{number}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data && data.status !== 404 ? (
              data.groupedData?.map((item, index) => {
                const totalCost = item.price.reduce((acc, price, idx) => {
                  const quantityIssued = item.quantity_issued[idx] || 0;
                  return acc + price * quantityIssued;
                }, 0);
                const totalStockOnHand = item.stock_on_hand.reduce(
                  (acc, stock) => acc + stock,
                  0
                );

                return (
                  <tr key={index}>
                    <td className="border border-black">{index + 1}</td>
                    <td className="border border-black">
                      {item && item.description}
                    </td>
                    {data.purchaseNo.map((poNumber, idx) => {
                      const stockIndex =
                        item && item.purchase_order_numbers.indexOf(poNumber);
                      return (
                        <td
                          className="border border-black"
                          key={`stock-${index}-${idx}`}
                        >
                          {stockIndex !== -1
                            ? item.initial_qty[stockIndex]
                            : ""}
                        </td>
                      );
                    })}
                    <td className="border border-black">
                      {item.initial_qty.reduce((acc, qty) => acc + qty, 0)}
                    </td>
                    {data.purchaseNo.map((poNumber, idx) => {
                      const issuedIndex =
                        item && item.purchase_order_numbers.indexOf(poNumber);
                      return (
                        <td
                          className="border border-black"
                          key={`issued-${index}-${idx}`}
                        >
                          {issuedIndex !== -1
                            ? item.quantity_issued[issuedIndex]
                            : ""}
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
                    <td className="border border-black">{totalStockOnHand}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="border border-black" colSpan={8}>
                  {`No Stock Summary for year ${selectedYear}`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InventoryTable;
