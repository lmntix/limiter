"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", thisYear: 18000, lastYear: 15000 },
  { name: "Feb", thisYear: 22000, lastYear: 18000 },
  { name: "Mar", thisYear: 25000, lastYear: 21000 },
  { name: "Apr", thisYear: 27000, lastYear: 24000 },
  { name: "May", thisYear: 30000, lastYear: 26000 },
  { name: "Jun", thisYear: 35000, lastYear: 28000 },
];

export function MonthlyComparisonChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar dataKey="thisYear" fill="hsl(var(--chart-1))" name="This Year" />
        <Bar dataKey="lastYear" fill="hsl(var(--chart-3))" name="Last Year" />
      </BarChart>
    </ResponsiveContainer>
  );
}
