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
  Sparkles,
} from "lucide-react";

import API from "@/lib/api";

import { useRouter } from "next/navigation";

export default function RegisterPage() {

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
      name: "",
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

        await API.post(
          "/register",
          formData
        );

        alert(
          "Account Created Successfully"
        );

        router.push(
          "/login"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Registration Failed"
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

        {/* Glow */}
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

            Build Better
            <br />

            Financial
            <span className="text-[#C08B5C]">
              {" "}Habits
            </span>

          </h2>

          <p className="
          text-zinc-400
          text-xl
          leading-relaxed
          mb-14
          ">

            Start tracking expenses,
            monitor savings,
            analyze trends,
            and grow financially
            with intelligent insights.

          </p>

          {/* Cards */}
          <div className="
          grid
          grid-cols-2
          gap-5
          ">

            

            {/* Card 3 */}
            <div className="
            bg-[#111111]
            border
            border-zinc-900
            rounded-3xl
            p-6
            backdrop-blur-xl
            col-span-2
            ">

              <div className="
              flex
              items-center
              justify-between
              ">

                <div>

                  <p className="
                  text-zinc-500
                  text-sm
                  mb-2
                  ">
                    Secure Financial Management
                  </p>

                  <h3 className="
                  text-3xl
                  font-bold
                  ">
                    End-to-End Protected
                  </h3>

                </div>

                <div className="
                w-14
                h-14
                rounded-2xl
                bg-blue-500/10
                flex
                items-center
                justify-center
                ">

                  <ShieldCheck
                    className="text-blue-400"
                    size={28}
                  />

                </div>

              </div>

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
        bottom-0
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

            Create Account

          </h2>

          <p className="
          text-zinc-500
          text-lg
          mb-10
          leading-relaxed
          ">

            Start managing your finances
            smarter with GoTrack.

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

            {/* Name */}
            <div>

              <label className="
              text-zinc-400
              text-sm
              block
              mb-3
              ">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                placeholder="Enter your full name"
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
                  placeholder="Create a password"
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
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>

          {/* Bottom */}
          <div className="
          mt-10
          text-center
          text-zinc-500
          ">

            Already have an account?{" "}

            <Link
              href="/login"
              className="
              text-[#C08B5C]
              hover:text-[#d4a06e]
              font-medium
              "
            >
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}