"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import API from "@/lib/api";

export default function CategoriesPage() {

  const [categories, setCategories] =
    useState([]);

  const [name, setName] =
    useState("");

  const [icon, setIcon] =
    useState("");

  const [color, setColor] =
    useState("#C08B5C");

  // Fetch Categories
  const fetchCategories =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await API.get(
            "/categories",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setCategories(
          response.data || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchCategories();

  }, []);

  // Create Category
  const createCategory =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await API.post(
          "/categories",
          {
            name,
            icon,
            color,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setName("");
        setIcon("");
        setColor("#C08B5C");

        fetchCategories();

      } catch (error) {

        console.log(error);
      }
    };

  // Delete Category
  const deleteCategory =
    async (id) => {

      try {

        const token =
          localStorage.getItem("token");

        await API.delete(
          `/categories/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        fetchCategories();

      } catch (error) {

        console.log(error);
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
            Categories
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Organize your financial activities.
          </p>

        </div>

        {/* Create Category */}
        <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            Create Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

            {/* Name */}
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
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
            />

            {/* Icon */}
            <input
              type="text"
              placeholder="Emoji"
              value={icon}
              onChange={(e) =>
                setIcon(
                  e.target.value
                )
              }
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
            />

            {/* Color */}
            <div className="flex items-center gap-3 bg-[#181818] border border-zinc-800 rounded-2xl px-4">

              <input
                type="color"
                value={color}
                onChange={(e) =>
                  setColor(
                    e.target.value
                  )
                }
                className="
                w-12
                h-12
                bg-transparent
                border-none
                cursor-pointer
                "
              />

              <span className="text-zinc-400">
                Pick Color
              </span>

            </div>

            {/* Button */}
            <button
              onClick={
                createCategory
              }
              className="
              bg-[#C08B5C]
              text-black
              rounded-2xl
              font-semibold
              hover:opacity-90
              transition-all
              "
            >
              Add Category
            </button>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-[#111111] rounded-3xl p-6 border border-zinc-900">

            <p className="text-zinc-500">
              Categories
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {
                categories.length
              }
            </h2>

          </div>

          <div className="bg-[#111111] rounded-3xl p-6 border border-zinc-900">

            <p className="text-zinc-500">
              Most Used
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Food
            </h2>

          </div>

          <div className="bg-[#111111] rounded-3xl p-6 border border-zinc-900">

            <p className="text-zinc-500">
              Total Expense
            </p>

            <h2 className="text-4xl font-bold mt-3">
              ₹24,500
            </h2>

          </div>

        </div>

        {/* Empty State */}
        {categories.length ===
          0 && (

          <div className="bg-[#111111] border border-dashed border-zinc-800 rounded-3xl p-16 text-center">

            <h2 className="text-3xl font-bold mb-3">
              No Categories Yet
            </h2>

            <p className="text-zinc-500">
              Create your first
              expense category.
            </p>

          </div>
        )}

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {categories.map(
            (category) => (

              <div
                key={category.id}
                className="
                bg-[#111111]
                border
                border-zinc-900
                rounded-3xl
                p-6
                hover:border-[#C08B5C]
                hover:scale-[1.01]
                transition-all
                duration-300
                "
              >

                <div className="flex items-start justify-between">

                  <div className="flex items-center gap-4">

                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor:
                          category.color +
                          "20",
                      }}
                    >
                      {
                        category.icon
                      }
                    </div>

                    <div>

                      <h3 className="text-2xl font-bold">
                        {
                          category.name
                        }
                      </h3>

                      <p className="text-zinc-500">
                        12 Transactions
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      deleteCategory(
                        category.id
                      )
                    }
                    className="
                    text-red-400
                    hover:text-red-300
                    "
                  >
                    Delete
                  </button>

                </div>

                <div className="mt-6">

                  <div className="flex items-center justify-between text-sm text-zinc-500 mb-2">

                    <span>
                      Total Spent
                    </span>

                    <span>
                      ₹12,450
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden">

                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "65%",
                        backgroundColor:
                          category.color,
                      }}
                    />

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}