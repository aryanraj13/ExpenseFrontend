"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import API from "@/lib/api";

import {
  Landmark,
  Wallet,
  CreditCard,
  Banknote,
  PiggyBank,
} from "lucide-react";

export default function AccountsPage() {

  const [accounts, setAccounts] =
    useState([]);

  const [formData, setFormData] =
    useState({
      name: "",
      type: "Bank",
      balance: "",
    });

  // Fetch Accounts
  const fetchAccounts =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await API.get(
            "/accounts",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAccounts(
          response.data || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchAccounts();

  }, []);

  // Handle Form Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Create Account
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.post(
          "/accounts",
          {
            ...formData,
            balance: Number(
              formData.balance
            ),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setFormData({
          name: "",
          type: "Bank",
          balance: "",
        });

        fetchAccounts();

      } catch (error) {

        console.log(error);
      }
    };

  // Delete Account
  const deleteAccount =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.delete(
          `/accounts/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchAccounts();

      } catch (error) {

        console.log(error);
      }
    };

  // Account Icons
  const getAccountIcon =
    (type) => {

      switch (type) {

        case "Bank":
          return Landmark;

        case "Wallet":
          return Wallet;

        case "Credit Card":
          return CreditCard;

        case "Cash":
          return Banknote;

        case "Savings":
          return PiggyBank;

        default:
          return Wallet;
      }
    };

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-x-hidden">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-6xl font-bold">
            Accounts
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Manage your financial accounts and balances.
          </p>

        </div>

        {/* Add Account */}
        <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Add Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-5"
          >

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Account Name"
              value={formData.name}
              onChange={handleChange}
              className="
              bg-[#181818]
              border
              border-zinc-800
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-[#C08B5C]
              transition-all
              "
              required
            />

            {/* Type */}
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="
              bg-[#181818]
              border
              border-zinc-800
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-[#C08B5C]
              transition-all
              "
            >

              <option>
                Bank
              </option>

              <option>
                Wallet
              </option>

              <option>
                Credit Card
              </option>

              <option>
                Cash
              </option>

              <option>
                Savings
              </option>

            </select>

            {/* Balance */}
            <input
              type="number"
              name="balance"
              placeholder="Balance"
              value={formData.balance}
              onChange={handleChange}
              className="
              bg-[#181818]
              border
              border-zinc-800
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-[#C08B5C]
              transition-all
              "
              required
            />

            {/* Button */}
            <button
              type="submit"
              className="
              bg-[#C08B5C]
              hover:bg-[#d49d6d]
              text-black
              rounded-2xl
              font-semibold
              transition-all
              "
            >
              Add Account
            </button>

          </form>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-500">
              Total Accounts
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {accounts.length}
            </h2>

          </div>

          <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-500">
              Total Balance
            </p>

            <h2 className="text-4xl font-bold mt-3">
              ₹
              {accounts.reduce(
                (acc, curr) =>
                  acc +
                  Number(
                    curr.balance
                  ),
                0
              )}
            </h2>

          </div>

          <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-6">

            <p className="text-zinc-500">
              Largest Account
            </p>

            <h2 className="text-4xl font-bold mt-3">

              {accounts.length > 0
                ? accounts.reduce(
                    (prev, curr) =>
                      Number(
                        prev.balance
                      ) >
                      Number(
                        curr.balance
                      )
                        ? prev
                        : curr
                  ).name
                : "-"}

            </h2>

          </div>

        </div>

        {/* Empty State */}
        {accounts.length === 0 && (

          <div className="bg-[#111111] border border-dashed border-zinc-800 rounded-3xl p-16 text-center">

            <h2 className="text-3xl font-bold mb-3">
              No Accounts Yet
            </h2>

            <p className="text-zinc-500">
              Add your first bank or wallet account.
            </p>

          </div>
        )}

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {accounts.map((account) => {

            const Icon =
              getAccountIcon(
                account.type
              );

            return (

              <div
                key={account.id}
                className="
                bg-[#111111]
                border
                border-zinc-900
                rounded-3xl
                p-7
                hover:border-[#C08B5C]
                hover:scale-[1.01]
                transition-all
                duration-300
                "
              >

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-zinc-500 mb-3">
                      {account.type}
                    </p>

                    <h2 className="text-3xl font-bold mb-5">
                      {account.name}
                    </h2>

                    <p className="text-5xl font-bold">
                      ₹
                      {account.balance}
                    </p>

                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-[#C08B5C]/10 flex items-center justify-center">

                    <Icon
                      size={32}
                      className="text-[#C08B5C]"
                    />

                  </div>

                </div>

                {/* Bottom Section */}
                <div className="mt-8 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <div className="w-2 h-2 rounded-full bg-green-400" />

                    <span className="text-zinc-500 text-sm">
                      Active
                    </span>

                  </div>

                  <button
                    onClick={() =>
                      deleteAccount(
                        account.id
                      )
                    }
                    className="
                    text-red-400
                    hover:text-red-300
                    text-sm
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}