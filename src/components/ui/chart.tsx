// src/components/ui/chart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import React from "react";

type DataPoint = {
  name: string;
  value: number;
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && Array.isArray(payload) && payload.length > 0) {
    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-semibold">{`${label}`}</p>
        <p>{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const Chart: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  if (!Array.isArray(data)) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
