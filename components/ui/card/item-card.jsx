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
    <div className="flex flex-row gap-x-4 p-2">
      {data && data.data.length > 0 ? (
        data.data.map((item, index) => (
          <div
            className={`lg:w-[23vw] w-96 flex  rounded-2xl   border-black text-md ${
              theme === true ? "glass" : "shadow-sm shadow-gray-400"
            }`}
            key={index}
          >
            <figure className="  w-2/6 flex justify-center items-center">
              <Image
                src={item.image}
                height={100}
                width={100}
                alt="Album"
                className=" aspect-square"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title uppercase">Item: {item.item}</h2>
              <p>Available: {item.quantity}</p>
              <p>Total Request : {item.stock_counter}</p>
              <p>Total Quantity Request : {item.total_quantity_request}</p>
              <p>Price: {item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <div>No items available</div>
      )}
    </div>
  );
};

export default ItemCard;
