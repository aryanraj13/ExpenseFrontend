"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import ExpenseChart from "../components/ExpenseChart";

import CategoryChart from "../components/CategoryChart";

import TransactionTable from "../components/TransactionTable";

import AddTransactionModal from "../components/AddTransactionModal";

import API from "@/lib/api";

import {
  ArrowDown,
  ArrowUp,
  Wallet,
  CreditCard,
} from "lucide-react";

export default function Dashboard() {

  const [stats, setStats] =
    useState(null);

  const [trends, setTrends] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [transactions, setTransactions] =
    useState([]);

  const [openModal, setOpenModal] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  // Fetch Dashboard Data
  const fetchDashboardData =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        // Redirect if not logged in
        if (!token) {

          window.location.href =
            "/login";

          return;
        }

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

        // Expense Trends
        const trendsRes =
          await API.get(
            "/analytics/trends",
            { headers }
          );

        setTrends(
          trendsRes.data || []
        );

        // Category Analytics
        const categoriesRes =
          await API.get(
            "/analytics/categories",
            { headers }
          );

        setCategories(
          categoriesRes.data || []
        );

        // Transactions
        const transactionsRes =
          await API.get(
            "/transactions",
            { headers }
          );

        setTransactions(
          transactionsRes.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  // Delete Transaction
  const deleteTransaction =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/transactions/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchDashboardData();

      } catch (error) {

        console.log(error);
      }
    };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href =
      "/login";
  };

  // Dashboard Cards
  const cards = [
    {
      title: "Income",
      value:
        stats?.totalIncome || 0,
      icon: ArrowUp,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Expense",
      value:
        stats?.totalExpense || 0,
      icon: ArrowDown,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
    {
      title: "Balance",
      value:
        stats?.netBalance || 0,
      icon: Wallet,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Transactions",
      value:
        stats?.totalTransactions || 0,
      icon: CreditCard,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
  ];

  if (loading) {

    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-x-hidden">

        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-10">

          <div>

            <h1 className="text-6xl font-bold tracking-tight">
              Dashboard
            </h1>

            <p className="text-zinc-500 mt-3 text-lg">
              Financial overview and analytics.
            </p>

          </div>

          <div className="flex items-center gap-4">

            <button
              onClick={() =>
                setOpenModal(true)
              }
              className="bg-[#C08B5C] hover:bg-[#d49d6d] text-black px-7 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02]"
            >
              + Add Transaction
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-6 py-4 rounded-2xl transition-all"
            >
              Logout
            </button>

            <div className="w-14 h-14 rounded-full bg-[#C08B5C] flex items-center justify-center text-2xl font-bold shadow-lg">
              A
            </div>

          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {cards.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="bg-[#111111] border border-zinc-900 rounded-3xl p-7 hover:border-[#C08B5C] transition-all duration-300 shadow-[0_0_25px_rgba(0,0,0,0.35)]"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-zinc-500 text-lg">
                      {item.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-5">
                      ₹{item.value}
                    </h2>

                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bg}`}
                  >

                    <Icon
                      size={30}
                      className={
                        item.color
                      }
                    />

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

          {/* Expense Trend */}
          <div className="xl:col-span-2 bg-[#111111] border border-zinc-900 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.25)]">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold">
                Expense Trends
              </h2>

              <span className="text-zinc-500 text-sm">
                Monthly Overview
              </span>

            </div>

            <div className="h-[380px]">

              <ExpenseChart
                data={trends}
              />

            </div>

          </div>

          {/* Category Analysis */}
          <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.25)]">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold">
                Category Analysis
              </h2>

              <span className="text-zinc-500 text-sm">
                Spending Breakdown
              </span>

            </div>

            <div className="h-[380px] flex items-center justify-center">

              <CategoryChart
                data={categories}
              />

            </div>

          </div>

        </div>

        {/* Transactions */}
        <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.25)]">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-3xl font-bold">
                Recent Transactions
              </h2>

              <p className="text-zinc-500 mt-2">
                Track and manage your finances.
              </p>

            </div>

          </div>

          <TransactionTable
            transactions={
              transactions
            }
            onDelete={
              deleteTransaction
            }
          />

        </div>

      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSuccess={
          fetchDashboardData
        }
      />

    </div>
  );
}