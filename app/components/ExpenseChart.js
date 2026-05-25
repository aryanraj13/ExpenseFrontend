"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

export default function ExpenseChart({
  data,
}) {

  return (
    <div className="w-full h-[320px]">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="colorExpense"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#C08B5C"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="#C08B5C"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <XAxis
            dataKey="month"
            stroke="#888"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#C08B5C"
            fillOpacity={1}
            fill="url(#colorExpense)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}