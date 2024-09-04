"use client";
import React from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import Image from "next/image";
import useInventoryStore from "@/components/store/store";

const ItemCard = () => {
  const { theme } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/get-top-stock",
    key: "top-items",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex md:flex-row gap-4 p-2 ">
      {data && data.data.length > 0 ? (
        data.data.map((item, index) => {
          const totalRequest =
            item.stockHistories.length > 1
              ? item.stockHistories[1].total_request
              : item.stockHistories[0].total_request;

          return (
            <div
              className={`lg:w-[20vw] w-[88dvw] flex rounded-2xl text-sm ${
                theme === true ? "glass" : "shadow-sm shadow-gray-400"
              }`}
              key={index}
            >
              <figure className="w-2/6 flex justify-center items-center">
                <Image
                  src={item.image}
                  height={70}
                  width={70}
                  alt="Item Image"
                  className="aspect-square"
                />
              </figure>
              <div className="card-body">
                <p>Item: {item.item}</p>
                <p>Available: {item.quantity_on_hand}</p>
                <p>Quantity Issued: {item.quantity_issued}</p>
                <p>Total Quantity Request: {totalRequest}</p>
                <p>Price: {item.price}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div>No items available</div>
      )}
    </div>
  );
};

export default ItemCard;
