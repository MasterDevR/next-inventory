"use client";
import React from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import Image from "next/image";

const TopStock = () => {
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/get-top-stock",
    token: token,
    key: "top-stock",
  });
  console.log(data);
  return (
    <div className="overflow-auto h-full">
      <div className="p-5 pb-10 space-y-5 lg:space-y-14">
        {data &&
          data.topStocks?.map((item, index) => {
            return (
              <div
                key={index + item.stock_no}
                className="flex flex-row shadow-inner shadow-gray-400 rounded-lg p-4 gap-x-5 text-base "
              >
                <Image
                  src={item.image}
                  alt={item.description}
                  height={50}
                  width={50}
                />
                <section className="flex flex-col">
                  <span>Description: {item.description}</span>
                  <span>Stock No.: {item.stock_no}</span>
                </section>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopStock;
