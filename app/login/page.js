"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  Eye,
  EyeOff,
  TrendingUp,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import API from "@/lib/api";

import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        const response =
          await API.post(
            "/login",
            formData
          );

        localStorage.setItem(
          "token",
          response.data.token
        );

        router.push(
          "/dashboard"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Invalid Credentials"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="
    min-h-screen
    bg-black
    text-white
    flex
    overflow-hidden
    ">

      {/* LEFT SIDE */}
      <div className="
      hidden
      lg:flex
      flex-1
      relative
      items-center
      justify-center
      p-16
      overflow-hidden
      ">

        {/* Background Glow */}
        <div className="
        absolute
        w-[700px]
        h-[700px]
        rounded-full
        bg-[#C08B5C]/10
        blur-3xl
        " />

        {/* Grid */}
        <div className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:60px_60px]
        " />

        {/* Content */}
        <div className="
        relative
        z-10
        max-w-xl
        w-full
        ">

          {/* Logo */}
          <div className="
          flex
          items-center
          gap-4
          mb-12
          ">

            <div className="
            w-14
            h-14
            rounded-2xl
            bg-[#C08B5C]
            flex
            items-center
            justify-center
            shadow-lg
            shadow-[#C08B5C]/20
            ">

              <TrendingUp
                className="text-black"
                size={28}
              />

            </div>

            <h1 className="
            text-5xl
            font-bold
            tracking-tight
            ">

              GoTrack

            </h1>

          </div>

          {/* Hero */}
          <h2 className="
          text-6xl
          leading-tight
          font-bold
          mb-6
          ">

            Smart Finance
            <br />

            Tracking for
            <span className="text-[#C08B5C]">
              {" "}Modern Users
            </span>

          </h2>

          <p className="
          text-zinc-400
          text-xl
          leading-relaxed
          mb-14
          ">

            Track expenses, monitor income,
            analyze spending habits,
            and manage your finances
            with real-time analytics.

          </p>

          {/* Cards */}
          <div className="
          grid
          grid-cols-2
          gap-5
          ">

            {/* Card 1 */}
            <div className="
            bg-[#111111]
            border
            border-zinc-900
            rounded-3xl
            p-6
            backdrop-blur-xl
            ">

              <div className="
              w-12
              h-12
              rounded-2xl
              bg-green-500/10
              flex
              items-center
              justify-center
              mb-5
              ">

                <Wallet
                  className="text-green-400"
                  size={24}
                />

              </div>

              <p className="
              text-zinc-500
              text-sm
              mb-2
              ">
                Monthly Savings
              </p>

              <h3 className="
              text-3xl
              font-bold
              ">
                ₹48,200
              </h3>

            </div>

            {/* Card 2 */}
            <div className="
            bg-[#111111]
            border
            border-zinc-900
            rounded-3xl
            p-6
            backdrop-blur-xl
            ">

              <div className="
              w-12
              h-12
              rounded-2xl
              bg-[#C08B5C]/10
              flex
              items-center
              justify-center
              mb-5
              ">

                <ShieldCheck
                  className="text-[#C08B5C]"
                  size={24}
                />

              </div>

              <p className="
              text-zinc-500
              text-sm
              mb-2
              ">
                Secure Tracking
              </p>

              <h3 className="
              text-3xl
              font-bold
              ">
                100%
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="
      w-full
      lg:w-[520px]
      border-l
      border-zinc-900
      bg-black/95
      backdrop-blur-2xl
      flex
      items-center
      justify-center
      p-10
      relative
      ">

        {/* Glow */}
        <div className="
        absolute
        top-0
        right-0
        w-96
        h-96
        bg-[#C08B5C]/10
        blur-3xl
        rounded-full
        " />

        <div className="
        relative
        z-10
        w-full
        max-w-md
        ">

          {/* Mobile Logo */}
          <div className="
          flex
          lg:hidden
          items-center
          gap-3
          mb-12
          ">

            <div className="
            w-12
            h-12
            rounded-2xl
            bg-[#C08B5C]
            flex
            items-center
            justify-center
            ">

              <TrendingUp
                className="text-black"
              />

            </div>

            <h1 className="
            text-4xl
            font-bold
            ">
              GoTrack
            </h1>

          </div>

          {/* Heading */}
          <h2 className="
          text-5xl
          font-bold
          mb-4
          leading-tight
          ">

            Welcome Back

          </h2>

          <p className="
          text-zinc-500
          text-lg
          mb-10
          leading-relaxed
          ">

            Login to continue managing
            your finances professionally.

          </p>

          {/* FORM */}
          <form
            onSubmit={
              handleSubmit
            }
            className="
            space-y-6
            "
          >

            {/* Email */}
            <div>

              <label className="
              text-zinc-400
              text-sm
              block
              mb-3
              ">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your email"
                className="
                w-full
                bg-[#111111]
                border
                border-zinc-800
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-[#C08B5C]
                transition-all
                text-white
                placeholder:text-zinc-600
                "
                required
              />

            </div>

            {/* Password */}
            <div>

              <label className="
              text-zinc-400
              text-sm
              block
              mb-3
              ">
                Password
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter your password"
                  className="
                  w-full
                  bg-[#111111]
                  border
                  border-zinc-800
                  rounded-2xl
                  px-5
                  py-4
                  pr-14
                  outline-none
                  focus:border-[#C08B5C]
                  transition-all
                  text-white
                  placeholder:text-zinc-600
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                  absolute
                  right-5
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                  hover:text-white
                  "
                >

                  {showPassword
                    ? <EyeOff size={20} />
                    : <Eye size={20} />
                  }

                </button>

              </div>

            </div>

            {/* Options */}
            <div className="
            flex
            items-center
            justify-end
            text-sm
            ">

              

              <button
                type="button"
                className="
                text-zinc-500
                hover:text-white
                transition-all
                "
              >
                Forgot Password?
              </button>

            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
              w-full
              bg-[#C08B5C]
              hover:bg-[#d4a06e]
              text-black
              font-bold
              py-4
              rounded-2xl
              transition-all
              shadow-lg
              shadow-[#C08B5C]/20
              "
            >

              {loading
                ? "Logging In..."
                : "Log In"}

            </button>

          </form>

          {/* Bottom */}
          <div className="
          mt-10
          text-center
          text-zinc-500
          ">

            Don’t have an account?{" "}

            <Link
              href="/register"
              className="
              text-[#C08B5C]
              hover:text-[#d4a06e]
              font-medium
              "
            >
              Create one
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}