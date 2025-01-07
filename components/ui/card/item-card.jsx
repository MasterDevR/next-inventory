"use client";
import React from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import { FaDropbox, FaUser, FaFile } from "react-icons/fa6";

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg border-l-4 h-32 border-l-orange-500 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <Icon className="text-orange-500 text-xl" />
      <span className="text-gray-600 font-medium">{label}</span>
    </div>
    <span className="text-xl font-bold text-gray-800">{value}</span>
  </div>
);

const ItemCard = () => {
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: "/admin/get-stats",
    token: token,
    key: "stats",
  });

  if (!token) return <div>Token not available</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available.</div>;

  const stats = [
    { icon: FaDropbox, label: "Total Item", value: data.Stock },
    { icon: FaUser, label: "Total Users", value: data.User },
    { icon: FaFile, label: "Pending Requests", value: data.Pending },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default ItemCard;
