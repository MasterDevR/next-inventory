"use client";
import React from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";

const UserIcon = () => {
  const { department_id, token, department_code } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: `/user/user-icon/${department_id}`,
    token: token,
    key: "icon",
  });

  if (isLoading) {
    return (
      <div className="skeleton h-16 w-16 shrink-0 rounded-full bg-white"></div>
    );
  }
  return (
    <div className="flex flex-row gap-x-5 items-center">
      <span className="font-bold">{department_code}</span>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img alt="user icon" src={data && data.icon?.image} />
        </div>
      </div>
    </div>
  );
};

export default UserIcon;
