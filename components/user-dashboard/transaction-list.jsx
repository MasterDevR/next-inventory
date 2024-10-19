"use client";
import React, { useEffect } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import { useRouter } from "next/navigation";
const Transaction_List = () => {
  const { department_id, token } = useInventoryStore();
  const router = useRouter();
  const { data } = useFetchData({
    path: `/user/get-transaction-history/${department_id}/undefined`,
    token: token,
    key: "transaction-history",
  });
  const btnHandler = (id) => {
    router.push(`/transaction/${id}`);
  };
  return (
    <div className="overflow-x-auto w-full bg-white p-4 rounded-xl shadow-lg">
      <table className="table">
        <thead className="text-base text-center">
          <tr>
            <th></th>
            <th>Transaction ID</th>
            <th>Purpose</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.result[0]?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="uppercase text-center cursor-pointer hover:bg-gray-200"
                  onClick={() => btnHandler(item.id)}
                >
                  <td>{index + 1}</td>
                  <td>{item.id}</td>

                  <td>{item.TransactionType.name}</td>
                  <td
                    className={`p-3  ${
                      item.Status.name === "approved"
                        ? "text-green-500"
                        : item.Status.name === "ready"
                        ? "text-blue-500"
                        : item.Status.name === "pending"
                        ? "text-violet-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.Status.name}
                  </td>
                  <td>
                    {new Date(item.created_at).toISOString().slice(0, 10)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction_List;
