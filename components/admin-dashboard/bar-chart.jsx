"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";

const CustomTooltip = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  const {
    name,
    Available,
    Total_Stock,
    approved_request,
    Total_Request,
    date,
  } = payload[0].payload;

  return (
    <div className="bg-white  p-2 rounded shadow-lg">
      <p className="font-bold">{name}</p>
      <p>Total Stock: {Total_Stock}</p>
      <p>Available: {Available}</p>
      <p>Approved Request: {approved_request}</p>
      <p>Total Request: {Total_Request}</p>
      <p>Date: {date}</p>
    </div>
  );
};

const BarCharts = ({ stock, year }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("first");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-stock-report/${stock}/${year}`
        );
        console.log("second");
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (stock && year) {
      console.log(stock, year);
      getData();
    }
  }, [stock, year]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
  const transformedData = data.result.map((item) => ({
    name: item.item || "",
    Available: item.quantity_on_hand,
    Total_Stock: item.quantity_on_hand + item.quantity_issued,
    Total_Request: item.total_request,
    approved_request: item.quantity_issued,
    date: new Date(item.created_at).toLocaleDateString(), // Format the date
  }));

  const maxDataValue = Math.max(
    ...transformedData.flatMap((item) => [
      item.Total_Stock,
      item.Available,
      item.approved_request,
      item.Total_Request,
    ])
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={transformedData}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis
          domain={[0, (maxDataValue) => maxDataValue * 2]}
          tick={{ fontSize: 14 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="Total_Stock"
          fill="#0865C1"
          activeBar={<Rectangle fill="#0865C1" stroke="white" />}
        />
        <Bar
          dataKey="Available"
          fill="#01DD05"
          activeBar={<Rectangle fill="#01DD05" stroke="white" />}
        />
        <Bar
          dataKey="approved_request"
          fill="red"
          activeBar={<Rectangle fill="red" stroke="white" />}
        />
        <Bar
          dataKey="Total_Request"
          fill="orange"
          activeBar={<Rectangle fill="orange" stroke="white" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
