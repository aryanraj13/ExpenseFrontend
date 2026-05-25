"use client";

import {
  useMemo,
  useState,
} from "react";

export default function TransactionTable({
  transactions,
  onDelete,
}) {

  const [search, setSearch] =
    useState("");

  const [typeFilter,
    setTypeFilter] =
    useState("all");

  const [categoryFilter,
    setCategoryFilter] =
    useState("all");

  // Categories
  const categories =
    useMemo(() => {

      return [
        ...new Set(
          transactions.map(
            (t) => t.category
          )
        ),
      ];

    }, [transactions]);

  // Filtered Transactions
  const filteredTransactions =
    transactions.filter(
      (item) => {

        const matchesSearch =
          item.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesType =
          typeFilter === "all"
            ? true
            : item.type ===
              typeFilter;

        const matchesCategory =
          categoryFilter === "all"
            ? true
            : item.category ===
              categoryFilter;

        return (
          matchesSearch &&
          matchesType &&
          matchesCategory
        );
      }
    );

  return (
    <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.25)]">

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6 mb-8">

        <div>

          <h2 className="text-3xl font-bold">
            Transactions
          </h2>

          <p className="text-zinc-500 mt-2">
            Manage and track all financial activity.
          </p>

        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
            bg-[#181818]
            border
            border-zinc-800
            rounded-2xl
            px-5
            py-3
            outline-none
            focus:border-[#C08B5C]
            transition-all
            "
          />

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(
                e.target.value
              )
            }
            className="
            bg-[#181818]
            border
            border-zinc-800
            rounded-2xl
            px-5
            py-3
            outline-none
            focus:border-[#C08B5C]
            transition-all
            "
          >

            <option value="all">
              All Types
            </option>

            <option value="income">
              Income
            </option>

            <option value="expense">
              Expense
            </option>

          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            className="
            bg-[#181818]
            border
            border-zinc-800
            rounded-2xl
            px-5
            py-3
            outline-none
            focus:border-[#C08B5C]
            transition-all
            "
          >

            <option value="all">
              All Categories
            </option>

            {categories.map(
              (category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}

          </select>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl">

        <table className="w-full border-separate border-spacing-y-3">

          {/* Sticky Header */}
          <thead className="sticky top-0 z-10">

            <tr className="text-zinc-500 text-left">

              <th className="pb-4 pl-4">
                Transaction
              </th>

              <th className="pb-4">
                Category
              </th>

              <th className="pb-4">
                Date
              </th>

              <th className="pb-4">
                Amount
              </th>

              <th className="pb-4 text-right pr-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredTransactions.length >
            0 ? (

              filteredTransactions.map(
                (item) => (

                  <tr
                    key={item.id}
                    className="
                    bg-[#181818]
                    hover:bg-[#1d1d1d]
                    transition-all
                    duration-300
                    rounded-2xl
                    border
                    border-transparent
                    hover:border-[#C08B5C]/30
                    "
                  >

                    {/* Transaction */}
                    <td className="py-5 pl-4 rounded-l-2xl">

                      <div>

                        <p className="font-semibold text-lg">
                          {item.title}
                        </p>

                        {/* Badge */}
                        <span
                          className={`
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          mt-2
                          font-medium

                          ${
                            item.type ===
                            "income"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }
                          `}
                        >

                          <div
                            className={`
                            w-2
                            h-2
                            rounded-full

                            ${
                              item.type ===
                              "income"
                                ? "bg-green-400"
                                : "bg-red-400"
                            }
                            `}
                          />

                          {item.type}

                        </span>

                      </div>

                    </td>

                    {/* Category */}
                    <td className="py-5">

                      <span className="
                      bg-[#222222]
                      border
                      border-zinc-700
                      px-4
                      py-2
                      rounded-full
                      text-sm
                      ">
                        {item.category}
                      </span>

                    </td>

                    {/* Date */}
                    <td className="py-5 text-zinc-400">

                      {new Date(
                        item.created_at
                      ).toLocaleDateString()}

                    </td>

                    {/* Amount */}
                    <td
                      className={`

                      py-5
                      text-xl
                      font-bold

                      ${
                        item.type ===
                        "income"
                          ? "text-green-400"
                          : "text-red-400"
                      }

                      `}
                    >

                      {item.type ===
                      "income"
                        ? "+"
                        : "-"}

                      ₹{item.amount}

                    </td>

                    {/* Action */}
                    <td className="py-5 pr-4 text-right rounded-r-2xl">

                      <button
                        onClick={() =>
                          onDelete(
                            item.id
                          )
                        }
                        className="
                        bg-red-500/10
                        hover:bg-red-500/20
                        text-red-400
                        px-4
                        py-2
                        rounded-xl
                        transition-all
                        "
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-20 text-zinc-500"
                >

                  <h2 className="text-2xl font-bold mb-2 text-white">
                    No Transactions Found
                  </h2>

                  <p>
                    Try adjusting filters or add a new transaction.
                  </p>

                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}