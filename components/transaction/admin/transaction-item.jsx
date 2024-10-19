"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import FilterTransaction from "./filter-transaction";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
const TransactionItem = () => {
  const params = useSearchParams();
  const { setTransactionDetails, token } = useInventoryStore();
  const queryClient = useQueryClient();
  const [searchTransaction, setSearchTransaction] = useState(undefined);
  const [status, setStatus] = useState("all");

  const { data, isLoading } = useFetchData({
    path: `/admin/get-all-transaction/${status}/${searchTransaction}`,
    token: token,
    key: "transaction",
  });
  useEffect(() => {
    queryClient.invalidateQueries(["transaction"]);
  }, [status, searchTransaction]);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data || !Array.isArray(data.data)) {
    return <div>No data available</div>;
  }
  const btnHandler = (item) => {
    setTransactionDetails(item);
    document.getElementById("transactipn-details").showModal();
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchTransaction(undefined);
    } else {
      setSearchTransaction(value);
    }
  };

  return (
    <div className="overflow-x-auto w-full mt-5 p-5 rounded-xl shadow-md bg-white space-y-10">
      <header className="flex  gap-x-5 flex-row ">
        <FilterTransaction getStatus={setStatus} />
        <input
          type="text"
          placeholder="Search Transaction"
          onChange={(e) => handleChange(e)}
          className="border border-gray-400 rounded-full pl-10 w-96"
        />
      </header>
      <table className="table">
        <thead>
          <tr className="text-base text-center ">
            <th></th>
            <th className="p-3 ">Transaction ID</th>
            <th className="p-3 ">Department</th>
            <th className="p-3 ">Status</th>
            <th className="p-3 ">Transaction Purpose</th>
            <th className="p-3 ">Date</th>
            <th className="p-3 ">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => (
            <tr
              key={item.id}
              className={`text-sm text-center ${
                params.get("id") === item.id && "bg-gray-100"
              } `}
            >
              <td className="p-3 text-center">{index + 1}</td>
              <td className="p-3 ">{item.id}</td>
              <td className="p-3 ">{item.user.department_code}</td>
              <td
                className={`p-3  ${
                  item.Status.name === "approved"
                    ? "text-green-500"
                    : item.Status.name === "ready"
                    ? "text-blue-500"
                    : item.Status.name === "pending"
                    ? "text-violet-500"
                    : "text-red-500"
                }`}
              >
                {item.Status.name}
              </td>
              <td className="p-3 ">{item.TransactionType.name}</td>
              <td className="p-3 ">{item.created_at}</td>
              <td className="p-3 ">
                <button
                  className=" text-sm hover:underline text-red-500"
                  onClick={() => btnHandler(item)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionItem;
