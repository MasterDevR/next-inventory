"use client";
import React, { useEffect, useState } from "react";

import useFetchData from "@/components/util/custom-hook/useFetchData";
import ItemCard from "@/components/ui/card/request-item-card";
import { useQueryClient } from "@tanstack/react-query";
const Page = () => {
  const [searchItem, setSearchItem] = useState(undefined);
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchData({
    path: `/admin/get-available-stock/${searchItem}`,
    key: "available-stock",
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["available-stock"],
    });
  }, [searchItem]);
  if (isLoading) {
    return <div>isLoading</div>;
  }
  const handleChange = (e) => {
    const value = e.target.value;
    if (value !== "") {
      setSearchItem(value);
    } else {
      setSearchItem(undefined);
    }
  };
  return (
    <div className="space-y-16">
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        placeholder="Search Item"
        className="border border-gray-400 rounded-2xl pl-10 w-full h-14"
      />
      <div className="flex flex-row flex-wrap gap-6 md:gap-4 lg:gap-5">
        {data &&
          data?.item?.map((item, index) => {
            return <ItemCard item={item} key={index} />;
          })}
        <div className="h-56 lg:h-0"></div>
      </div>
    </div>
  );
};

export default Page;
