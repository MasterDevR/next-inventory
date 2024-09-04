"use client";
import React, { useEffect, useState } from "react";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import Select from "@/components/ui/select/select";
const FilterTransaction = ({ getStatus }) => {
  const [status, setStatus] = useState();
  const { data } = useFetchData({
    path: "/admin/get-all-transaction-status",
    key: "transaction-status",
  });
  useEffect(() => {
    setStatus(data?.result);
  }, [data]);

  return (
    <Select
      data={status}
      onChange={getStatus}
      width={"w-fit"}
      defaultValue={status && status[0]?.name}
    />
  );
};

export default FilterTransaction;
