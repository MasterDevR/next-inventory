import { useEffect, useState } from "react";
import axios from "axios";
import useFetchData from "@/components/util/custom-hook/useFetchData";

const StockTypeSelect = ({ value, onChange }) => {
  const { data, isLoading } = useFetchData({
    path: "/admin/get-stock-type",
    key: "stock-type",
  });
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  if (isLoading) return <p>Loading...</p>;

  return (
    <select
      className="select select-bordered w-full border border-black "
      value={value}
      onChange={handleChange}
      name="stockType"
    >
      <option value="" disabled>
        Select Stock Type
      </option>
      {data &&
        data?.type.map((item, index) => (
          <option key={index} value={item.name}>
            {item.name}
          </option>
        ))}
    </select>
  );
};

export default StockTypeSelect;
