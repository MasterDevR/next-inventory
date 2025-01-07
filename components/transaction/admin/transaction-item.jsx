"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import FilterTransaction from "./filter-transaction";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import NoDataFound from "@/components/stock/NoDataFound";
import { FaSearch } from "react-icons/fa";

const TransactionItem = () => {
  const params = useSearchParams();
  const { setTransactionDetails, token } = useInventoryStore();
  const queryClient = useQueryClient();
  const [searchTransaction, setSearchTransaction] = useState(undefined);
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        className={`md:hidden p-4 rounded-lg border mb-3  ${
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
                : item.Status.name === "completed"
                ? "bg-yellow-100 text-yellow-700"
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

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get current items
  const currentItems = data.data.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderDesktopTable = () => {
    return (
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full border-collapse border border-gray-300">
          <thead>
            <tr className="text-base text-center bg-gray-200">
              <th className=" border border-gray-300"></th>
              <th className=" border border-gray-300">Transaction ID</th>
              <th className=" border border-gray-300">Department</th>
              <th className=" border border-gray-300">Status</th>
              <th className=" border border-gray-300">Transaction Purpose</th>
              <th className=" border border-gray-300">Date</th>
              <th className=" border border-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-3 text-center">
                  <NoDataFound />
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`text-sm text-center ${
                    params.get("id") === item.id && "bg-gray-100"
                  } border border-gray-300`}
                >
                  <td className="  text-center border border-gray-300">
                    {index + indexOfFirstItem + 1}
                  </td>
                  <td className="  border border-gray-300">{item.id}</td>
                  <td className="  uppercase border border-gray-300">
                    {item.user.department_code}
                  </td>
                  <td
                    class
                    Name={`   ${
                      item.Status.name === "approved"
                        ? "text-green-500"
                        : item.Status.name === "ready"
                        ? "text-blue-500"
                        : item.Status.name === "pending"
                        ? "text-violet-500"
                        : item.Status.name === "completed"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.Status.name}
                  </td>
                  <td className="  border border-gray-300">
                    {item.TransactionType.name}
                  </td>
                  <td className="  border border-gray-300">
                    {item.created_at}
                  </td>
                  <td className="  border border-gray-300">
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
    );
  };

  return (
    <div className="w-full  p-3 rounded-xl shadow-md  space-y-6  pb-20  bg-white ">
      <header className="flex flex-col md:flex-row gap-4 md:gap-5">
        <FilterTransaction getStatus={setStatus} />
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search Transaction"
            onChange={(e) => handleChange(e)}
            className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </header>

      {/* Mobile Cards View */}
      <div className="md:hidden">
        {currentItems?.length === 0 ? (
          <NoDataFound />
        ) : (
          currentItems.map((item, index) => renderMobileCard(item, index))
        )}
      </div>

      {/* Desktop Table View */}
      {renderDesktopTable()}

      {/* Pagination Controls - Visible on both mobile and desktop */}
      <div className="flex justify-center ">
        {Array.from(
          { length: Math.ceil(data.data.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default TransactionItem;
