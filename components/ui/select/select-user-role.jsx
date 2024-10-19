"use client";
import React, { useEffect } from "react";
import Select from "./select";
import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "@/components/store/store";
const SelectRole = ({ setRole }) => {
  const { token } = useInventoryStore();
  const { data, isLoading, error } = useFetchData({
    path: "/admin/get-user-role",
    token: token,
    key: "user",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Select
      data={data?.result || []}
      title={"Select Role"}
      onChange={setRole}
    />
  );
};

export default React.memo(SelectRole);
