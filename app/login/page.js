"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

export default function LoginPage() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await API.post("/login", formData);

      localStorage.setItem("token", response.data.token);

      router.push("/");

    } catch (error) {

      console.log(error);

      alert("Invalid Credentials");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-4xl font-bold mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 mb-8">
          Login to continue tracking your expenses.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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
              ? "Logging in..."
              : "Login"}

          </button>
        </form>

        <p className="text-zinc-400 text-sm mt-6 text-center">

          Don't have an account?{" "}

          <a
            href="/register"
            className="text-white hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}