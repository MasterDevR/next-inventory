"use client";
import React from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";

const ItemCard = () => {
  const { data, isLoading } = useFetchData({
    path: "/admin/get-top-stock",
    key: "top-items",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }
  const { Stock, User, Pending } = data;
  return (
    <div className="flex md:flex-row gap-4 p-2 text-white">
      <div className="w-96 h-40 border bg-white shadow-md text-blue-400 flex items-center rounded-md justify-center font-bold lg:text-2xl">{`${Stock} Stock`}</div>
      <div className="w-96 h-40 border bg-white shadow-md text-green-400 flex items-center rounded-md justify-center font-bold lg:text-2xl">{`${User} User`}</div>
      <div className="w-96 h-40 border bg-white shadow-md text-red-400 flex items-center rounded-md justify-center font-bold lg:text-2xl">{`${Pending} Pending Request`}</div>
    </div>
  );
};

export default ItemCard;
