"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "../ui/card/item-card";
import BarChart from "@/components/admin-dashboard/bar-chart";
import Select from "@/components/ui/select/select";
import useFetchData from "../util/custom-hook/useFetchData";

const AdminDashboard = () => {
  const { data } = useFetchData({
    path: `/admin/get-stock-year`,
    key: "select-report",
  });

  const [selectedStock, setSelectedStock] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [yearOptions, setYearOptions] = useState([]);

  useEffect(() => {
    if (data?.result) {
      setSelectedStock(data.result[0]?.item);
      setSelectedYear(data.result[0]?.stockHistories?.[0]?.name);

      const initialStock = data.result.find(
        (item) => item.item === data.result[0]?.item
      );
      const initialYears = [
        ...new Set(initialStock?.stockHistories.map((history) => history.name)),
      ];
      setYearOptions(initialYears);
    }
  }, [data]);

  useEffect(() => {
    if (data?.result && selectedStock) {
      const stock = data.result.find((item) => item.item === selectedStock);

      const uniqueYears = [
        ...new Set(stock?.stockHistories.map((history) => history.name)),
      ].sort((a, b) => Number(b) - Number(a));

      setYearOptions(uniqueYears);

      if (!uniqueYears.includes(selectedYear)) {
        setSelectedYear(uniqueYears[0]);
      }
    }
  }, [selectedStock, data]);

  return (
    <div className="flex gap-y- flex-col justify-between h-[80dvh]">
      <ItemCard />
      <main className="lg:w-4/6 shadow-md rounded-lg shadow-gray-400 bg-white h-auto space-y-20 p-4">
        <div className="w-fit flex lg:flex-row gap-5 ">
          <Select
            data={data?.result?.map((item) => item.item) || []}
            onChange={setSelectedStock}
            defaultValue={selectedStock}
            width="w-fit"
          />
          <Select
            data={yearOptions}
            onChange={setSelectedYear}
            defaultValue={selectedYear}
            width="w-fit"
          />
        </div>
        <div className="w-full h-80 relative overflow-x-auto border-2">
          <BarChart stock={selectedStock} year={selectedYear} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
