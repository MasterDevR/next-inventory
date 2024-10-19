"use client";
import React, { Fragment, useEffect, useState } from "react";
import OpenItemListBtn from "@/components/ui/button/open-modal";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useInvetoryStore from "../store/store";

const ITEMS_PER_PAGE = 10;

const InventoryTable = () => {
  const { token } = useInvetoryStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchItem, setSearchItem] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  // Custom hook for fetching data with pagination
  const { data, isLoading } = useFetchData({
    path: `/admin/get-stock/${searchItem}?page=${currentPage}`, // Include the current page in the API request
    token: token,
    key: "stock",
  });

  useEffect(() => {
    queryClient.invalidateQueries(["stock"]);
  }, [searchItem, currentPage]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchItem(undefined);
    } else {
      setSearchItem(value);
    }
    setCurrentPage(1); // Reset to the first page on new search
  };

  // Handle page change

  const getPaginationRange = (currentPage, totalPages) => {
    const maxVisiblePages = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const paginationRange = data
    ? getPaginationRange(currentPage, data.totalPages)
    : [];

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <Fragment>
      <header className="mb-10 h-auto relative w-full flex gap-5 flex-col md:flex-row">
        <div className="flex gap-x-5">
          <OpenItemListBtn title="Create" id="create-stock" />
          <OpenItemListBtn title="Add" id="add-stock" />
        </div>
        <input
          type="text"
          placeholder="Search Item"
          onChange={handleChange}
          className="border border-gray-400 rounded-full w-full md:w-96 pl-10"
        />
      </header>
      <div className="overflow-x-auto">
        <table className="table overflow-hidden rounded-none text-center">
          <thead>
            <tr>
              <th></th>
              <th>Description</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Stock No.</th>
              <th>Type</th>
              <th>Consume Date</th>
              <th>Manufacturer</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.item && data.item.length > 0 ? (
              data.item.map((item, index) => (
                <tr
                  key={index}
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    router.push(`/inventory/${item.stock_no}`);
                  }}
                >
                  <td>{(currentPage - 1) * ITEMS_PER_PAGE + (index + 1)}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity_on_hand}</td>
                  <td>{item.measurement}</td>
                  <td>{item.stock_no}</td>
                  <td>{item.stocktype.name}</td>
                  <td>{item.consume_date}</td>
                  <td>{item.distributor}</td>
                  <td>
                    <button
                      className="font-bold text-center w-full text-lg"
                      onClick={(event) => handleButtonClick(event, item)}
                    >
                      ...
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center font-bold text-lg">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {data &&
        data.totalPages > 1 && ( // Show pagination if totalPages > 1
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm"
            >
              &lt; {/* Left arrow */}
            </button>
            {paginationRange.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-active" : ""
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === data.totalPages}
              className="btn btn-sm"
            >
              &gt;
            </button>
          </div>
        )}
    </Fragment>
  );
};

export default InventoryTable;
