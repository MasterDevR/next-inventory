"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "../ui/card/item-card";
import BarChart from "@/components/admin-dashboard/bar-chart";
import Select from "@/components/ui/select/select";
import useFetchData from "../util/custom-hook/useFetchData";
import useInventoryStore from "../store/store";
import TopStock from "@/components/admin-dashboard/top-stock";
const AdminDashboard = () => {
  const { token } = useInventoryStore();
  const { data } = useFetchData({
    path: `/admin/get-stock-year`,
    token,
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
    <div className="flex flex-col lg:flex-row w-full gap-5 pb-20 h-auto lg:h-[90dvh]">
      <main className="w-full lg:w-4/6 flex flex-col  justify-between gap-5">
        <ItemCard />
        <section className="w-full shadow-md rounded-lg shadow-gray-400 space-y-20 p-4 bg-white">
          <div className="w-fit flex lg:flex-row gap-2 flex-col ">
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
          <div className="w-full h-80 relative border-2">
            <BarChart stock={selectedStock} year={selectedYear} />
          </div>
        </section>
      </main>
      <aside className="h-full shadow-md rounded-lg shadow-gray-400 bg-white w-full lg:w-2/6 divide-y-2 overflow-hidden ">
        <h1 className="text-center text-2xl font-bold p-4 text-orange-500">
          Top 5 Most Requested Item
        </h1>
        <TopStock />
      </aside>
    </div>
  );
};

export default AdminDashboard;
