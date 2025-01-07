"use client";
import React, { Fragment, useEffect, useState } from "react";
import OpenItemListBtn from "@/components/ui/button/open-modal";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import useInvetoryStore from "../store/store";
import DeleteStockBtn from "@/components/ui/button/delete-stock-btn";
import EditBtn from "@/components/ui/button/edit-item-btn";
import StockMobileView from "./stock-mobile-view";
import NoDataFound from "./NoDataFound";
import { FaEye } from "react-icons/fa";

const ITEMS_PER_PAGE = 10;

const InventoryTable = () => {
  const { token } = useInvetoryStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [searchItem, setSearchItem] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const { data, isLoading } = useFetchData({
    path: `/admin/get-stock/${searchItem}?page=${currentPage}`,
    token: token,
    key: "stock",
  });

  useEffect(() => {
    queryClient.invalidateQueries(["stock"]);
  }, [searchItem, currentPage, queryClient]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSearchItem(undefined);
    } else {
      setSearchItem(value);
    }
    setCurrentPage(1);
  };

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  return (
    <Fragment>
      <header className="mb-10 h-auto relative w-full flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5">
          <OpenItemListBtn title="Create" id="create-stock" />
          <OpenItemListBtn title="Add" id="add-stock" />
        </div>
        <input
          type="text"
          placeholder="Search Item"
          onChange={handleChange}
          className="border border-gray-400 rounded-full w-full sm:w-auto sm:flex-grow pl-4 sm:pl-10 py-2"
        />
      </header>

      {/* Mobile view */}
      <StockMobileView
        data={data}
        router={router}
        paginationRange={paginationRange}
        handlePageChange={handlePageChange}
      />

      {/* Desktop view */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300">No.</th>
              <th className="p-2 border border-gray-300">Description</th>
              <th className="p-2 border border-gray-300">Price</th>
              <th className="p-2 border border-gray-300">Qty</th>
              <th className="p-2 border border-gray-300">Unit</th>
              <th className="p-2 border border-gray-300">Stock No.</th>
              <th className="p-2 border border-gray-300">Type</th>
              <th className="p-2 border border-gray-300">Consume Date</th>
              <th className="p-2 border border-gray-300">Manufacturer</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.item && data.item.length > 0 ? (
              data.item.map((item, index) => (
                <tr
                  key={index + item.stock_no + item.description}
                  className="table-auto w-full border-collapse border border-gray-300 "
                >
                  <td className="p-2 border border-gray-300">
                    {(currentPage - 1) * ITEMS_PER_PAGE + (index + 1)}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.description}
                  </td>
                  <td className="p-2 border border-gray-300">{item.price}</td>
                  <td className="p-2 border border-gray-300">
                    {item.quantity_on_hand}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.measurement}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.stock_no}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.stocktype.name}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.consume_date}
                  </td>
                  <td className="p-2 border border-gray-300">
                    {item.distributor}
                  </td>

                  <td className="p-2 border border-gray-300 relative">
                    <div className="flex justify-center items-center gap-1">
                      <EditBtn stock_no={item.stock_no} />
                      <button
                        onClick={() => {
                          router.push(`/inventory/${item.stock_no}`);
                        }}
                        className="btn btn-sm flex items-center btn-success btn-outline"
                      >
                        <FaEye className="mr-2" />
                        <span className="hidden md:block">View</span>
                      </button>
                      <DeleteStockBtn stock_no={item.stock_no} id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11}>
                  <NoDataFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls (for desktop) */}
      {data && data.totalPages > 1 && (
        <div className="hidden md:flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            &lt;
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
