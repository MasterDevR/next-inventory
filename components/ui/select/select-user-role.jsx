"use client";
import React from "react";
import Select from "./select";
import useFetchData from "@/components/util/custom-hook/useFetchData";
const SelectRole = ({ setRole }) => {
  const { data, isLoading, error } = useFetchData({
    path: "/admin/get-user-role",
    key: "user",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Select data={data.result} title={"Select Stock Type"} onChange={setRole} />
  );
};

export default React.memo(SelectRole);
