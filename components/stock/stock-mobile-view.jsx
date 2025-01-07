"use client";
import React from "react";
import DeleteStockBtn from "@/components/ui/button/delete-stock-btn";
import EditBtn from "@/components/ui/button/edit-item-btn";
import NoDataFound from "./NoDataFound";
const StockMobileView = ({
  data,
  currentPage,
  router,
  paginationRange,
  handlePageChange,
}) => {
  return (
    <div className="md:hidden pb-52">
      <div className="space-y-4">
        {data && data.item && data.item?.length > 0 ? (
          data.item.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 relative"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.description}</h3>
                <div className="flex space-x-2">
                  <EditBtn stock_no={item.stock_no} />
                  <DeleteStockBtn stock_no={item.stock_no} id={item.id} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p>
                  <span className="font-semibold">Price:</span> {item.price}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {item.quantity_on_hand}
                </p>
                <p>
                  <span className="font-semibold">Unit:</span>{" "}
                  {item.measurement}
                </p>
                <p>
                  <span className="font-semibold">Stock No:</span>{" "}
                  {item.stock_no}
                </p>
                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {item.stocktype.name}
                </p>
                <p>
                  <span className="font-semibold">Consume Date:</span>{" "}
                  {item.consume_date}
                </p>
                <p className="col-span-2">
                  <span className="font-semibold">Manufacturer:</span>{" "}
                  {item.distributor}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => router.push(`/inventory/${item.stock_no}`)}
                  className="btn btn-primary btn-sm w-full"
                >
                  View
                </button>
              </div>
            </div>
          ))
        ) : (
          <NoDataFound />
        )}
      </div>

      {/* Pagination Controls (for mobile) */}
      {data && data.totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2 pb-52">
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
    </div>
  );
};

export default StockMobileView;
