"use client";
import React from "react";

import useFetchData from "@/components/util/custom-hook/useFetchData";
import ItemCard from "@/components/ui/card/request-item-card";

const page = () => {
  const { data, isLoading } = useFetchData({
    path: "/admin/get-stock",
    key: "stock",
  });

  if (isLoading) {
    return <div>isLoading</div>;
  }
  return (
    <div>
      <div className="flex flex-row lg:justify-start justify-center flex-wrap gap-5">
        {data &&
          data?.item.map((item, index) => {
            return <ItemCard item={item} key={index} />;
          })}
      </div>
    </div>
  );
};

export default page;
