"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import FilterTransaction from "./filter-transaction";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import NoDataFound from "@/components/stock/NoDataFound";
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

  const renderMobileCard = (item, index) => {
    return (
      <div
        key={item.id}
        className={`md:hidden p-4 rounded-lg border mb-3 ${
          params.get("id") === item.id
            ? "bg-gray-50 border-primary"
            : "border-gray-200"
        }`}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm text-gray-600">Transaction ID</p>
            <p className="font-medium">{item.id}</p>
          </div>
          <span
            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
            ${
              item.Status.name === "approved"
                ? "bg-green-100 text-green-700"
                : item.Status.name === "ready"
                ? "bg-blue-100 text-blue-700"
                : item.Status.name === "pending"
                ? "bg-violet-100 text-violet-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {item.Status.name}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Department</span>
            <span className="text-sm font-medium">
              {item.user.department_code}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Purpose</span>
            <span className="text-sm font-medium">
              {item.TransactionType.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Date</span>
            <span className="text-sm font-medium">
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        <button
          className="w-full mt-4 px-4 py-2 text-sm text-primary border border-primary hover:bg-primary/10 rounded-full transition-colors"
          onClick={() => btnHandler(item)}
        >
          View Details
        </button>
      </div>
    );
  };

  return (
    <div className="w-full mt-5 p-3 md:p-5 rounded-xl shadow-md bg-white space-y-6">
      <header className="flex flex-col md:flex-row gap-4 md:gap-5">
        <FilterTransaction getStatus={setStatus} />
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Transaction"
            onChange={(e) => handleChange(e)}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </header>

      {/* Mobile Cards View */}
      <div className="md:hidden">
        {data.data.length === 0 ? (
          <NoDataFound />
        ) : (
          data.data.map((item, index) => renderMobileCard(item, index))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
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
            {data.data.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-3 text-center">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              data.data.map((item, index) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionItem;
