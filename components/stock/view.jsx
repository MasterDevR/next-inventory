"use client";
import React from "react";
import Image from "next/image";
import DeleteStockBtn from "@/components/ui/button/delete-stock-btn";
import EditBtn from "@/components/ui/button/edit-item-btn";

const StockMobileView = ({
  data,
  currentPage,
  ITEMS_PER_PAGE,
  handleButtonClick,
  selectedItemId,
  router,
}) => {
  return (
    <div className="space-y-4 md:hidden pb-52">
      {data && data.item && data.item.length > 0 ? (
        data.item.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 relative"
            onClick={() => router.push(`/inventory/${item.stock_no}`)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{item.description}</h3>
              <button
                onClick={(event) => handleButtonClick(event, item)}
                className="font-bold text-xl"
              >
                ...
              </button>
            </div>
            {selectedItemId === item.id && (
              <div className="absolute right-2 top-10 z-10 p-2 w-32 bg-white rounded-md shadow-lg flex flex-col justify-center items-center gap-y-3 text-white">
                <EditBtn stock_no={item.stock_no} />
                <DeleteStockBtn stock_no={item.stock_no} id={item.id} />
              </div>
            )}
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>
                <span className="font-semibold">Price:</span> {item.price}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {item.quantity_on_hand}
              </p>
              <p>
                <span className="font-semibold">Unit:</span> {item.measurement}
              </p>
              <p>
                <span className="font-semibold">Stock No:</span> {item.stock_no}
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
            {item.image && (
              <div className="mt-2">
                <Image
                  src={item.image}
                  height={100}
                  width={100}
                  placeholder="blur"
                  sizes="100px"
                  blurDataURL={item.image}
                  alt={item.item}
                  priority
                  className="rounded-md"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center font-bold text-lg p-4">No Data Found</div>
      )}
    </div>
  );
};

export default StockMobileView;
