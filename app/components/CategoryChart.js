"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CategoryChart({
  data,
}) {

  const COLORS = [
    "#C08B5C",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#3B82F6",
  ];

  return (
    <div className="w-full h-[320px]">

      <ResponsiveContainer>

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="total"
            nameKey="category"
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />

            ))}

          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}