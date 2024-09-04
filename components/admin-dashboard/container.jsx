"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "../ui/card/item-card";
import BarChart from "@/components/admin-dashboard/bar-chart";
import Pie_Chart from "./pie-chart";
import Select from "@/components/ui/select/select";
import useFetchData from "../util/custom-hook/useFetchData";

const AdminDashboard = () => {
  const { data, isLoading } = useFetchData({
    path: `/admin/get-stock-year`,
    key: "select-report",
  });

  const [selectedStock, setSelectedStock] = useState();
  const [selectedYear, setSelectedYear] = useState();

  useEffect(() => {
    if (data) {
      setSelectedStock(data.items[0]?.item);
      setSelectedYear(data.years[data.years.length - 2]);
    }
  }, [data]);

  return (
    <div className="flex gap-4">
      <main className="lg:w-10/12">
        <header className="snap-x flex gap-x-5 overflow-x-auto">
          <ItemCard />
        </header>
        <section className="h-[53dvh]  relative lg:top-16 p-4 shadow-md rounded-lg shadow-gray-400 space-y-10">
          <div className="w-full flex lg:flex-row gap-5">
            <Select
              data={data?.items?.map((item) => item.item) || []}
              onChange={setSelectedStock}
              defaultValue={data?.items[0]?.item || ""}
              width="w-fit"
            />
            <Select
              data={data?.years || []}
              onChange={setSelectedYear}
              defaultValue={data?.years[data?.years.length - 1] || ""}
              width="w-fit"
            />
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className=" w-4/6 h-96 relative  overflow-x-auto  ">
              <BarChart stock={selectedStock} year={selectedYear} />
            </div>
            {/* <div className="w-2/6 h-96">
            <Pie_Chart />
          </div> */}
          </div>
        </section>
      </main>
      <aside className="border-2 border-red-500 h-[84dvh] lg:w-3/12 "></aside>
    </div>
  );
};

export default AdminDashboard;
