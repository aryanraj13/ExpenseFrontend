"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import TransactionTable from "../components/TransactionTable";

import AddTransactionModal from "../components/AddTransactionModal";

import API from "@/lib/api";

export default function TransactionsPage() {

  const [transactions,
    setTransactions] =
    useState([]);

  const [openModal,
    setOpenModal] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

  // Fetch Transactions
  const fetchTransactions =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await API.get(
            "/transactions",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setTransactions(
          response.data || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    fetchTransactions();

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

        fetchTransactions();

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <div>

            <h1 className="text-5xl font-bold">
              Transactions
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage your income and expenses.
            </p>

          </div>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="bg-[#C08B5C] text-black px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-all"
          >
            + Add Transaction
          </button>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="bg-[#141414] border border-zinc-800 rounded-3xl p-10 text-center text-zinc-500">

            Loading transactions...

          </div>

        ) : (

          <TransactionTable
            transactions={
              transactions
            }
            onDelete={
              deleteTransaction
            }
          />

        )}

      </div>

      {/* Modal */}
      <AddTransactionModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSuccess={
          fetchTransactions
        }
      />

    </div>
  );
}