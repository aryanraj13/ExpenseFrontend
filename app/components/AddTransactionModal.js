"use client";

import {
  useState,
} from "react";

import API from "@/lib/api";

export default function AddTransactionModal({
  open,
  onClose,
  onSuccess,
}) {

  const [formData, setFormData] =
    useState({
      title: "",
      type: "expense",
      amount: "",
      category: "",
      description: "",
    });

  const [loading, setLoading] =
    useState(false);

  if (!open) return null;

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    setLoading(true);

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await API.post(
        "/transactions",
        {
          ...formData,
          amount: Number(
            formData.amount
          ),
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      onSuccess();

      onClose();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create transaction"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

      <div className="w-full max-w-2xl bg-[#141414] border border-zinc-800 rounded-3xl p-8">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold text-white">

            Add Transaction

          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="title"
            placeholder="Transaction title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-[#1B1B1B] border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="bg-[#1B1B1B] border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
            >

              <option value="expense">
                Expense
              </option>

              <option value="income">
                Income
              </option>

            </select>

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="bg-[#1B1B1B] border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
              required
            />

          </div>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#1B1B1B] border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={handleChange}
            rows={4}
            className="w-full bg-[#1B1B1B] border border-zinc-700 rounded-2xl px-5 py-4 outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C08B5C] text-black font-semibold py-4 rounded-2xl hover:opacity-90 transition-all"
          >

            {loading
              ? "Creating..."
              : "Create Transaction"}

          </button>

        </form>

      </div>

    </div>
  );
}