"use client";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import React from "react";

const DepartmentTable = () => {
  const { data, isLoading } = useFetchData({
    path: "/admin/get-all-user",
    key: "userData",
  });

  if (isLoading) {
    return <div>isLoading</div>;
  }
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        <thead>
          <tr className="text-lg font-bold ">
            <th>Department Name</th>
            <th>Department ID</th>
            <th>Department Code</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.users?.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.department}</td>
                  <td>{user.department_id}</td>
                  <td>{user.department_code}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
