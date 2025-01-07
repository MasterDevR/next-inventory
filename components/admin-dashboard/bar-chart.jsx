"use client";
import React, { useEffect } from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { useQueryClient } from "@tanstack/react-query";

import useFetchData from "@/components/util/custom-hook/useFetchData";
import useInventoryStore from "../store/store";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  const { Stock } = payload[0].payload;

  return (
    <div className="border border-black p-1 md:p-2 rounded shadow-lg bg-white text-xs md:text-sm">
      <p className="font-bold">{label}</p>
      <p className="text-blue-500 font-bold">Stock: {Stock}</p>
    </div>
  );
};

const LineCharts = ({ stock, year }) => {
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: `/admin/get-stock-report/${stock}/${year}`,
    token: token,
    key: "line-report",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(["line-report"]);
  }, [stock, year, queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.result) return <div>No data available</div>;
  if (data?.result?.length === 0)
    return (
      <div className="h-48 md:h-80 flex justify-center items-center shadow-md border rounded-md shadow-gray-400">
        <h1 className="text-red-500 text-sm lg:text-lg font-bold text-center px-2">
          No Available Data for Item{" "}
          <span className="uppercase underline">{stock} </span>
          on Year {year}
        </h1>
      </div>
    );

  const initializedData = months.map((month) => ({
    month,
    Stock: 0,
  }));

  const transformedData = data.result.reduce((acc, item) => {
    const month = new Date(item.created_at).toLocaleString("default", {
      month: "short",
    });
    const monthData = acc.find((d) => d.month === month);

    if (monthData) {
      monthData.Stock = item.quantity_on_hand + item.quantity_issued;
    }

    return acc;
  }, initializedData);

  return (
    <div className="h-48 md:h-80">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="overflow-x-auto"
      >
        <ComposedChart
          data={transformedData}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }}
            interval={window?.innerWidth < 768 ? 1 : 0}
          />
          <YAxis
            domain={[0, (maxDataValue) => maxDataValue + 50]}
            tick={{ fontSize: 10 }}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Bar dataKey="Stock" fill="#0f5799" stroke="blue" fillOpacity={0.8} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineCharts;
