"use client";
import React, { useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
  "Jun ",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CustomTooltip = ({ payload }) => {
  if (!payload || payload.length === 0) return null;
  const { name, Stock, Request, Issued } = payload[0].payload;

  return (
    <div className="border border-black p-2 rounded shadow-lg bg-white text-xs lg:text-base">
      <p className="font-bold">{name}</p>
      <p className="text-blue-500 font-bold">
        Stock:
        {Stock}
      </p>
      <p className="text-green-600 bold">Request: {Request}</p>
      <p className="text-red-600 bold">Issued: {Issued}</p>
    </div>
  );
};

const BarCharts = ({ stock, year }) => {
  const { token } = useInventoryStore();
  const { data, isLoading } = useFetchData({
    path: `/admin/get-stock-report/${stock}/${year}`,
    token: token,
    key: "bar-report",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(["bar-report"]);
  }, [stock, year]);

  if (isLoading) return <div>Loading...</div>;
  if (!data?.result) return <div>No data available</div>;
  if (data?.result.length === 0)
    return (
      <div className="h-80 flex justify-center items-center shadow-md border rounded-md shadow-gray-400">
        <h1 className="text-red-500 lg:text-lg font-bold">
          No Available Data for Item{" "}
          <span className="uppercase underline">{stock} </span>
          on Year {year}
        </h1>
      </div>
    );

  const initializedData = months.map((month) => ({
    month,
    Total_Stock: 0,
    Total_Request: 0,
    date: "",
  }));

  const transformedData = data.result.reduce((acc, item) => {
    const month = new Date(item.created_at).toLocaleString("default", {
      month: "short",
    });
    const monthData = acc.find((d) => d.month === month);

    if (monthData) {
      monthData.Issued = item.quantity_issued;
      monthData.Stock = item.quantity_on_hand + item.quantity_issued;
      monthData.Request = item.total_request;
      monthData.date = new Date(item.created_at).toLocaleDateString();
    }

    return acc;
  }, initializedData);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className={`overflow-x-auto`}
    >
      <BarChart
        data={transformedData}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" tick={{ fontSize: 14 }} />
        <YAxis
          domain={[0, (maxDataValue) => maxDataValue * 2]}
          tick={{ fontSize: 14 }}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Legend />
        <Bar
          dataKey="Stock"
          fill="blue"
          activeBar={<Rectangle fill="blue" stroke="white" />}
        />
        <Bar
          dataKey="Request"
          fill="green"
          activeBar={<Rectangle fill="green" stroke="white" />}
        />
        <Bar
          dataKey="Issued"
          fill="red"
          activeBar={<Rectangle fill="red" stroke="white" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
