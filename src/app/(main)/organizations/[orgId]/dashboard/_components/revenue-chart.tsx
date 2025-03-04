"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", revenue: 18000, expenses: 12000 },
  { name: "Feb", revenue: 22000, expenses: 13000 },
  { name: "Mar", revenue: 25000, expenses: 14000 },
  { name: "Apr", revenue: 27000, expenses: 13500 },
  { name: "May", revenue: 30000, expenses: 15000 },
  { name: "Jun", revenue: 35000, expenses: 16000 },
  { name: "Jul", revenue: 40000, expenses: 18000 },
  { name: "Aug", revenue: 42000, expenses: 17000 },
  { name: "Sep", revenue: 45000, expenses: 19000 },
  { name: "Oct", revenue: 48000, expenses: 20000 },
  { name: "Nov", revenue: 50000, expenses: 21000 },
  { name: "Dec", revenue: 52000, expenses: 22000 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
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
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--chart-1))"
          activeDot={{ r: 8 }}
          name="Revenue"
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="hsl(var(--chart-2))"
          name="Expenses"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
