"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "../ui/card/item-card";
import BarChart from "@/components/admin-dashboard/bar-chart";
import Select from "@/components/ui/select/select";
import useFetchData from "../util/custom-hook/useFetchData";
import useInventoryStore from "../store/store";
import TopStock from "@/components/admin-dashboard/top-stock";
import RequestSchedule from "@/components/admin-dashboard/request-schedule";
import SearchSelect from "@/components/ui/select/search-select";

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

  const items = data?.result?.map((item) => item.item) || [];

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

  const handleSelectChange = (value) => {
    setSelectedStock(value);
  };

  return (
    <div className="space-y-5">
      <ItemCard />
      <div className="flex flex-col lg:flex-row w-full gap-5 pb-20 h-auto  ">
        <main className="w-full lg:w-4/6 flex flex-col  justify-between gap-5">
          <RequestSchedule />
          <section className="w-full shadow-md rounded-lg shadow-gray-400 space-y-10 p-3 bg-white">
            <div className="w-full flex lg:flex-row gap-2 flex-col">
              <SearchSelect
                data={items}
                onChange={setSelectedStock}
                defaultValue={selectedStock}
                width="w-full"
              />
              <Select
                data={yearOptions}
                onChange={setSelectedYear}
                defaultValue={selectedYear}
                width="w-fit"
              />
            </div>
            <div className="w-full h-72 relative border-2">
              <BarChart stock={selectedStock} year={selectedYear} />
            </div>
          </section>
        </main>
        <aside className="bg-white rounded-xl shadow-lg w-full lg:w-2/6 flex flex-col  overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
            <h1 className="text-center text-xl font-semibold text-white">
              Top 5 Most Requested Items
            </h1>
          </div>
          <div className="flex-1 overflow-auto h-full">
            <TopStock />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AdminDashboard;
