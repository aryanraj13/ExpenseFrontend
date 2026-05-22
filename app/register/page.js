"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { useEffect } from "react";

export default function RegisterPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {

  const token = localStorage.getItem("token");

  if (token) {
    router.push("/");
  }

}, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      await API.post("/register", formData);

      alert("Registration Successful");

      router.push("/login");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold mb-2">
          Create Account
        </h1>

        <p className="text-zinc-400 mb-8">
          Start managing your expenses today.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-white transition-all"
              required
            />
          </div>

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-white transition-all"
              required
            />
          </div>

          <div>

            <label className="block mb-2 text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 outline-none focus:border-white transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-200"
          >

            {loading
              ? "Creating Account..."
              : "Register"}

          </button>
        </form>

        <p className="text-zinc-400 text-sm mt-6 text-center">

          Already have an account?{" "}

          <a
            href="/login"
            className="text-white hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}