"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import API from "@/lib/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

export default function AnalyticsPage() {

  const [stats, setStats] =
    useState(null);

  const [trends, setTrends] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  // Fetch Analytics
  const fetchAnalytics =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const headers = {
          Authorization:
            `Bearer ${token}`,
        };

        // Dashboard Stats
        const statsRes =
          await API.get(
            "/dashboard",
            { headers }
          );

        setStats(statsRes.data);

        // Monthly Trends
        const trendsRes =
          await API.get(
            "/analytics/trends",
            { headers }
          );

        setTrends(
          trendsRes.data || []
        );

        // Categories
        const categoriesRes =
          await API.get(
            "/analytics/categories",
            { headers }
          );

        setCategories(
          categoriesRes.data || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const insightCards = [
    {
      title: "Total Income",
      value:
        stats?.totalIncome || 0,
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      title: "Total Expense",
      value:
        stats?.totalExpense || 0,
      icon: TrendingDown,
      color: "text-red-400",
    },
    {
      title: "Net Balance",
      value:
        stats?.netBalance || 0,
      icon: Wallet,
      color: "text-yellow-400",
    },
    {
      title: "Transactions",
      value:
        stats?.totalTransactions ||
        0,
      icon: BadgeIndianRupee,
      color: "text-blue-400",
    },
  ];

  const COLORS = [
    "#C08B5C",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#3B82F6",
  ];

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Analytics
          </h1>

          <p className="text-zinc-400 mt-2">
            Deep financial insights and trends.
          </p>

        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {insightCards.map(
            (item, index) => {

              const Icon =
                item.icon;

              return (

                <div
                  key={index}
                  className="bg-[#141414] border border-zinc-800 rounded-3xl p-6 hover:border-[#C08B5C] transition-all"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-zinc-400">
                        {item.title}
                      </p>

                      <h2 className="text-3xl font-bold mt-4">
                        ₹{item.value}
                      </h2>

                    </div>

                    <div
                      className={
                        item.color
                      }
                    >

                      <Icon size={30} />

                    </div>

                  </div>

                </div>
              );
            }
          )}

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

          {/* Monthly Expense Chart */}
          <div className="bg-[#141414] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-semibold">
                Monthly Expenses
              </h2>

              <span className="text-zinc-500 text-sm">
                Trend Analysis
              </span>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={trends}
                >

                  <XAxis
                    dataKey="month"
                    stroke="#888"
                  />

                  <Tooltip />

                  <Bar
                    dataKey="total"
                    fill="#C08B5C"
                    radius={[
                      10,
                      10,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Category Breakdown */}
          <div className="bg-[#141414] border border-zinc-800 rounded-3xl p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-semibold">
                Spending Breakdown
              </h2>

              <span className="text-zinc-500 text-sm">
                Categories
              </span>

            </div>

            <div className="h-[350px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={categories}
                    dataKey="total"
                    nameKey="category"
                    outerRadius={110}
                  >

                    {categories.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Top Categories */}
        <div className="bg-[#141414] border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-semibold">
              Top Spending Categories
            </h2>

          </div>

          <div className="space-y-6">

            {categories.map(
              (item, index) => {

                const total =
                  categories.reduce(
                    (acc, curr) =>
                      acc +
                      Number(
                        curr.total
                      ),
                    0
                  );

                const percentage =
                  total > 0
                    ? (
                        (item.total /
                          total) *
                        100
                      ).toFixed(1)
                    : 0;

                return (

                  <div
                    key={index}
                  >

                    <div className="flex items-center justify-between mb-2">

                      <div>

                        <p className="font-medium">
                          {
                            item.category
                          }
                        </p>

                        <p className="text-zinc-500 text-sm mt-1">
                          {percentage}%
                          of spending
                        </p>

                      </div>

                      <p className="font-bold text-lg">
                        ₹{item.total}
                      </p>

                    </div>

                    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">

                      <div
                        className="h-full rounded-full bg-[#C08B5C]"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </div>

    </div>
  );
}