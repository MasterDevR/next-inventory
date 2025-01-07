"use client";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import React, { useEffect } from "react";
import useInventoryStore from "../store/store";

const DepartmentTable = () => {
  const { token } = useInventoryStore();
  const { data } = useFetchData({
    path: "/admin/get-all-user",
    token: token,
    key: "userData",
  });

  return (
    <div className="w-full">
      {/* Table view for medium and larger screens */}
      <div className="hidden md:block overflow-x-auto w-full text-center">
        <table className="table min-w-full">
          <thead className="">
            <tr className="text-sm lg:text-base">
              <th className="px-4 py-3">Department Name</th>
              <th className="px-4 py-3">Department ID</th>
              <th className="px-4 py-3">Department Code</th>
              <th className="px-4 py-3">Requestor Type</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {data && data.users?.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No departments found
                </td>
              </tr>
            ) : (
              data &&
              data.users?.map((user, index) => (
                <tr
                  key={index + user.department}
                  className="uppercase border-black text-center text-sm lg:text-base hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{user.department}</td>
                  <td className="px-4 py-3">{user.department_id}</td>
                  <td className="px-4 py-3">{user.department_code}</td>
                  <td className="px-4 py-3">
                    {user.Requestor_type?.name || "NULL"}
                  </td>
                  <td className="px-4 py-3">{user.email || "NULL"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile screens */}
      <div className="md:hidden space-y-4 px-4">
        {data && data.users?.length === 0 ? (
          <div className="text-center py-4">No departments found</div>
        ) : (
          data &&
          data.users?.map((user, index) => (
            <div
              key={user.department_id + index}
              className="bg-white p-4 rounded-lg shadow space-y-3"
            >
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Department Name</span>
                <span className="font-medium uppercase">{user.department}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Department ID</span>
                <span className="font-medium uppercase">
                  {user.department_id}
                </span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Department Code</span>
                <span className="font-medium uppercase">
                  {user.department_code}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email</span>
                <span className="font-medium uppercase">
                  {user.email || "NULL"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DepartmentTable;
