"use client";
import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  tickFormatter,
} from "recharts";

const data = [
  {
    name: "Page A",
    available: 4000,
    Stock: 100,
    amt: 2400,
    requested: 100,
  },
  {
    name: "Page B",
    available: 3000,
    Stock: 1398,
    amt: 2210,
    requested: 100,
  },
  {
    name: "Page C",
    available: 2000,
    Stock: 300,
    amt: 2290,
    requested: 100,
  },
  {
    name: "Page D",
    available: 2780,
    Stock: 3908,
    amt: 2000,
    requested: 100,
  },
  {
    name: "Page D",
    available: 2780,
    Stock: 3908,
    amt: 2000,
    requested: 100,
  },
  {
    name: "Page D",
    available: 2780,
    Stock: 3908,
    amt: 2000,
    requested: 100,
  },
  {
    name: "Page D",
    available: 2780,
    Stock: 3908,
    amt: 2000,
    requested: 100,
  },
  {
    name: "Page D",
    available: 2780,
    Stock: 100,
    amt: 2000,
    requested: 4000,
  },
  {
    name: "Page D",
    available: 2780,
    Stock: 100,
    amt: 2000,
    requested: 4000,
  },
  {
    name: "Page De",
    available: 2780,
    Stock: 100,
    amt: 2000,
    requested: 4000,
  },
  {
    name: "Page D",
    available: 2780,
    Stock: 100,
    amt: 2000,
    requested: 4000,
  },
];
const BarCharts = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis
          domain={[0, (dataMax) => dataMax + 2000]}
          tick={{ fontSize: 14 }}
        />
        <Tooltip />
        <Legend />
        <Bar
          radius={10}
          dataKey="Stock"
          fill="#8884d8"
          activeBar={<Rectangle fill="#8884d8" stroke="white" />}
        />
        <Bar
          radius={10}
          dataKey="available"
          fill="#82ca9d"
          activeBar={<Rectangle fill="#82ca9d" stroke="white" />}
        />{" "}
        <Bar
          radius={10}
          dataKey="requested"
          fill="red"
          activeBar={<Rectangle fill="red" stroke="white" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarCharts;
