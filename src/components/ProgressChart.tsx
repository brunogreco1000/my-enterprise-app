// src/components/ProgressChart.tsx
import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data: { name: string; progress: number }[];
  height?: number;
  barColor?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  data,
  height = 200,
  barColor = '#4f46e5',
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="progress" fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
