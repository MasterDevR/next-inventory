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
    <div className="overflow-x-auto w-full   text-center">
      <table className="table">
        <thead className=" text-white bg-custom-bg-3 text-sm md:text-xl">
          <tr>
            <th>Department Name</th>
            <th>Department ID</th>
            <th>Department Code</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.users?.map((user, index) => {
              return (
                <tr
                  key={index}
                  className="uppercase border-black  text-center text-xs lg:text-base"
                >
                  <td>{user.department}</td>
                  <td>{user.department_id}</td>
                  <td>{user.department_code}</td>
                  <td>{user.email || "NULL"}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
