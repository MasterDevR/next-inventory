"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
import FilterTransaction from "./filter-transaction";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";
const TransactionItem = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { setTransactionDetails } = useInventoryStore();
  const queryClient = useQueryClient();
  const refsearchData = useRef();
  const [searchTransaction, setSearchTransaction] = useState(undefined);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [status, setStatus] = useState();
  const { data, isLoading } = useFetchData({
    path: `/admin/get-all-transaction/${status}/${searchTransaction}`,
    key: "transaction",
  });

  useEffect(() => {
    queryClient.invalidateQueries(["transaction"]);
    router.push("/transaction");
  }, [status]);

  useEffect(() => {
    queryClient.invalidateQueries(["transaction"]);
  }, [searchTransaction]);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data || !Array.isArray(data.data)) {
    return <div>No data available</div>;
  }

  const btnHandler = (item) => {
    setTransactionDetails(item);
    document.getElementById("transactipn-details").showModal();
  };

  const handleChange = () => {
    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      const value = refsearchData.current.value;
      if (value === "") {
        setSearchTransaction(undefined);
      } else {
        setSearchTransaction(value);
      }
    }, 1000);

    setTypingTimeout(timeout);
  };

  return (
    <Fragment>
      <header className="flex flex-row gap-x-10">
        <FilterTransaction getStatus={setStatus} />
        <input
          type="text"
          placeholder="Search Transaction"
          onChange={handleChange}
          ref={refsearchData}
          className="border border-gray-400 rounded-full pl-10 w-full"
        />
      </header>
      <div className="overflow-x-auto w-full mt-5 rounded-lg shadow-sm p-5 shadow-gray-400">
        <table className="table">
          <thead>
            <tr className="text-base text-white text-center bg-custom-bg-3 ">
              <th></th>
              <th className="p-3 border-l">Transaction ID</th>
              <th className="p-3 border-l">Department</th>
              <th className="p-3 border-l">Status</th>
              <th className="p-3 border-l">Transaction Purpose</th>
              <th className="p-3 border-l">Date</th>
              <th className="p-3 border-l">Request Details</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <Fragment key={item.id}>
                <tr
                  key={item.id}
                  className={`text-sm text-center ${
                    params.get("id") === item.id && "bg-gray-100"
                  } `}
                >
                  <td className="p-3 border-l ">{index + 1}</td>
                  <td className="p-3 border-l">{item.id}</td>
                  <td className="p-3 border-l">{item.user.department_code}</td>
                  <td
                    className={`p-3 border-l ${
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
                  <td className="p-3 border-l">{item.TransactionType.name}</td>
                  <td className="p-3 border-l">{item.created_at}</td>
                  <td className="p-3 border-l">
                    <button
                      className=" text-sm hover:underline text-red-500"
                      onClick={() => btnHandler(item)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default TransactionItem;
