"use client";
import React from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import { FaDropbox, FaUser, FaFile } from "react-icons/fa6";
const ItemCard = () => {
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/get-stats",
    token: token,
    key: "stats",
  });

  if (!token) {
    return <div>Token not available</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }
  const { Stock, User, Pending } = data;
  return (
    <div className="flex justify-between flex-col md:flex-row gap-4 p-2 text-center text-sm lg:text-base font-bold ">
      <div className="w-full md:w-96 h-36   bg-white shadow-md   flex justify-center items-center gap-x-2 border-l-orange-500 border-l-8 rounded-lg">
        <FaDropbox />
        {`${Stock} Stock`}
      </div>
      <div className="w-full md:w-96 h-36  bg-white shadow-md  flex justify-center items-center gap-x-2 border-l-orange-500 border-l-8 rounded-lg">
        <FaUser />
        {`${User} User`}
      </div>
      <div className="w-full md:w-96 h-36  bg-white shadow-md  flex justify-center items-center gap-x-2 border-l-orange-500 border-l-8 rounded-lg">
        <FaFile />
        {`${Pending} Pending Request`}
      </div>
    </div>
  );
};

export default ItemCard;
