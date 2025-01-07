"use client";
import useInventoryStore from "@/components/store/store";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import Download_Stock_Card from "@/components/ui/button/download-btn/download-stock-card";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
// list of month with index from 0 to 11 and january to december if selected is january then set to 0
const monthList = [
  {
    name: "January",
    value: 0,
  },
  {
    name: "February",
    value: 1,
  },
  {
    name: "March",
    value: 2,
  },
  {
    name: "April",
    value: 3,
  },
  {
    name: "May",
    value: 4,
  },
  {
    name: "June",
    value: 5,
  },
  {
    name: "July",
    value: 6,
  },
  {
    name: "August",
    value: 7,
  },
  {
    name: "September",
    value: 8,
  },
  {
    name: "October",
    value: 9,
  },
  {
    name: "November",
    value: 10,
  },
  {
    name: "December",
    value: 11,
  },
];
const Page = ({ params }) => {
  const queryClient = useQueryClient();
  const { token } = useInventoryStore();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const { data } = useFetchData({
    path: `/admin/stock-card/${params.stock_no}/${selectedYear}/${selectedMonth}`,
    token: token,
    key: "stock-card",
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["stock-card"] });
  }, [selectedYear, selectedMonth, queryClient]);

  return (
    <div className="overflow-hidden bg-gray-50 p-5 rounded-lg ">
      <header className="mb-4 w-full lg:w-5/6 mx-auto flex flex-col bg-white lg:flex-row lg:justify-between lg:items-center shadow-inner p-4 rounded-lg shadow-gray-200">
        <h3 className="text-md font-medium ">
          Item:{" "}
          {data ? data.data[0].stock.item : <div className="w-20 h-10"></div>}
        </h3>
        <h3 className="text-md font-medium ">
          Description:{" "}
          {data ? (
            data.data[0].stock.description
          ) : (
            <div className="w-20 h-10"></div>
          )}
        </h3>
        <h3 className="text-md font-medium ">
          Stock No:{" "}
          {data ? (
            data.data[0].stock.stock_no
          ) : (
            <div className="w-20 h-10"></div>
          )}
        </h3>

        {/* add select for year */}
        <select
          className="select select-bordered w-fit"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {data ? (
            data.availableYear.map((year, index) => (
              <option value={year} key={index}>
                {year}
              </option>
            ))
          ) : (
            <div className="w-20 h-10"></div>
          )}
        </select>
        <select
          className="select select-bordered w-fit"
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {monthList.map((month, index) => (
            <option value={month.value} key={index}>
              {month.name}
            </option>
          ))}
        </select>
        <div className="w-fit">
          {data && <Download_Stock_Card data={data} />}
        </div>
      </header>
      {/* Table Layout */}
      <div className=" p-5 w-full  lg:w-5/6 mx-auto border-2 bg-white border-gray-200 rounded-lg overflow-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th className="w-8" rowSpan={2}>
                Date
              </th>
              <th className="w-8" rowSpan={2}>
                Reference
              </th>
              <th className="w-8">Receipt</th>
              <th className="w-8" colSpan={2}>
                Issue
              </th>
              <th className="w-8">Balance</th>
              <th className="w-8" rowSpan={2}>
                No. of Days to Consume
              </th>
            </tr>
            <tr>
              <th className="w-8">Qty</th>
              <th className="w-8">Qty</th>
              <th className="w-8">Office</th>
              <th className="w-8">Qty</th>
            </tr>
          </thead>
          <tbody>
            {data &&
            data.status === 200 &&
            data.data &&
            data.data?.length > 0 ? (
              data.data.map((item, index) => {
                // Get transaction items and initial quantity
                const transactionItems = item.transaction_item || [];
                const initialQty = data.initialQty;
                let balance = initialQty;

                return (
                  <>
                    {/* Display the initial balance on the first row */}
                    {index === 0 && (
                      <tr key={`initial-${index}`} className="text-center">
                        <td>
                          {new Date(data.initialDate).toLocaleDateString()}
                        </td>
                        <td colSpan={4} className="font-bold"></td>
                        <td>{balance}</td>
                        <td></td>
                      </tr>
                    )}

                    {/* Display each transaction item */}
                    {transactionItems.map((transaction, idx) => {
                      // Update the balance based on transaction data
                      const issueQty = transaction.approved_quantity;
                      balance -= issueQty;

                      return (
                        <tr key={transaction.id} className="text-center">
                          <td>
                            {new Date(
                              transaction.created_at
                            ).toLocaleDateString()}
                          </td>
                          <td>{transaction.ris}</td>
                          <td>{transaction.quantity}</td>
                          <td>{transaction.approved_quantity}</td>
                          <td>{transaction.office}</td>
                          <td>{balance}</td>
                          <td>{item.stock.consume_date}</td>
                        </tr>
                      );
                    })}
                  </>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="text-center font-bold text-lg">
                  {data && data.status === 404 && `${data.message}`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
