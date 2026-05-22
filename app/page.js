"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function Home() {

  const router = useRouter();

  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  // Fetch Expenses
  const fetchExpenses = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(response.data || []);

    } catch (error) {

      console.log(error);

      setExpenses([]);
    }
  };

  // Fetch Summary
  const fetchSummary = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get("/expenses/summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSummary(response.data || []);

    } catch (error) {

      console.log(error);

      setSummary([]);
    }
  };

  // Protected Route
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      router.push("/login");

      return;
    }

    fetchExpenses();
    fetchSummary();

  }, []);

  // Handle Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update Expense
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      if (editingId) {

        await API.put(
          `/expenses/${editingId}`,
          {
            title: formData.title,
            amount: Number(formData.amount),
            category: formData.category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      } else {

        await API.post(
          "/expenses",
          {
            title: formData.title,
            amount: Number(formData.amount),
            category: formData.category,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
      });

      setEditingId(null);

      fetchExpenses();
      fetchSummary();

    } catch (error) {

      console.log(error);

      alert("Failed to save expense");

    } finally {

      setLoading(false);
    }
  };

  // Delete Expense
  const handleDelete = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchExpenses();
      fetchSummary();

    } catch (error) {

      console.log(error);

      alert("Failed to delete expense");
    }
  };

  // Edit Expense
  const handleEdit = (expense) => {

    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
    });

    setEditingId(expense.id);
  };

  const totalExpenses = (summary || []).reduce(
    (acc, item) => acc + item.total,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Expense Tracker
            </h1>

            <p className="text-zinc-400 mt-2">
              Track and manage your expenses efficiently.
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              router.push("/login");
            }}
            className="bg-red-500/20 text-red-400 px-5 py-3 rounded-2xl hover:bg-red-500/30 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 p-6 mb-8 shadow-lg hover:scale-[1.01] transition-all duration-300">

          <h2 className="text-2xl font-semibold mb-6">

            {editingId
              ? "Edit Expense"
              : "Add Expense"}

          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >

            <input
              type="text"
              name="title"
              placeholder="Expense title"
              value={formData.title}
              onChange={handleChange}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-white transition-all"
              required
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-white transition-all"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-white transition-all"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black rounded-2xl font-semibold hover:scale-[1.02] transition-all"
            >

              {loading
                ? "Saving..."
                : editingId
                ? "Update Expense"
                : "Add Expense"}

            </button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-zinc-800 shadow-lg hover:scale-[1.01] transition-all duration-300">

            <p className="text-zinc-400 text-sm">
              Total Expenses
            </p>

            <h2 className="text-3xl font-bold mt-3">
              ₹{totalExpenses}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-zinc-800 shadow-lg hover:scale-[1.01] transition-all duration-300">

            <p className="text-zinc-400 text-sm">
              Categories
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {summary?.length || 0}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-6 border border-zinc-800 shadow-lg hover:scale-[1.01] transition-all duration-300">

            <p className="text-zinc-400 text-sm">
              Total Transactions
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {expenses?.length || 0}
            </h2>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Expense List */}
          <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 p-6 shadow-lg">

            <h2 className="text-2xl font-semibold mb-6">
              Recent Expenses
            </h2>

            <div className="space-y-4">

              {expenses?.length > 0 ? (

                expenses.map((expense) => (

                  <div
                    key={expense.id}
                    className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-zinc-500 transition-all"
                  >

                    <div>

                      <h3 className="text-lg font-semibold">
                        {expense.title}
                      </h3>

                      <p className="text-zinc-400 text-sm mt-1">
                        {expense.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <span className="text-xl font-bold">
                        ₹{expense.amount}
                      </span>

                      <button
                        onClick={() => handleEdit(expense)}
                        className="bg-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-600 transition-all"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="bg-red-500/20 text-red-400 px-4 py-2 rounded-xl hover:bg-red-500/30 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))

              ) : (

                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-10 text-center text-zinc-400">
                  No expenses found.
                </div>
              )}

            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl border border-zinc-800 p-6 shadow-lg">

            <h2 className="text-2xl font-semibold mb-6">
              Expense Summary
            </h2>

            <div className="space-y-5">

              {summary?.length > 0 ? (

                summary.map((item, index) => (

                  <div
                    key={index}
                    className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4"
                  >

                    <div className="flex items-center justify-between">

                      <span className="text-zinc-300">
                        {item.category}
                      </span>

                      <span className="font-bold text-lg">
                        ₹{item.total}
                      </span>
                    </div>

                    <div className="w-full bg-zinc-700 rounded-full h-2 mt-4 overflow-hidden">

                      <div
                        className="bg-white h-full rounded-full"
                        style={{
                          width: `${totalExpenses > 0
                            ? (item.total / totalExpenses) * 100
                            : 0
                            }%`,
                        }}
                      />
                    </div>
                  </div>
                ))

              ) : (

                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-10 text-center text-zinc-400">
                  No summary available.
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}