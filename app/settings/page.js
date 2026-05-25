"use client";

import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";

import API from "@/lib/api";

import {
  Bell,
  Moon,
  Shield,
  User,
  LogOut,
  CreditCard,
} from "lucide-react";

export default function SettingsPage() {

  const [profile,
    setProfile] =
    useState({
      name: "",
      email: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  const [darkMode,
    setDarkMode] =
    useState(true);

  const [notifications,
    setNotifications] =
    useState(true);

  const [currency,
    setCurrency] =
    useState("INR");

  // Fetch Profile
  const fetchProfile =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const response =
          await API.get(
            "/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setProfile(
          response.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchProfile();

  }, []);

  // Handle Input
  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  // Save Profile
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          "/profile",
          profile,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Profile Updated"
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  // Logout
  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    window.location.href =
      "/login";
  };

  return (
    <div className="flex bg-black min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 p-8 overflow-x-hidden">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-6xl font-bold">
            Settings
          </h1>

          <p className="text-zinc-500 mt-3 text-lg">
            Manage your account and preferences.
          </p>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="xl:col-span-2 space-y-8">

            {/* Profile */}
            <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-[#C08B5C]/10 flex items-center justify-center">

                  <User
                    className="text-[#C08B5C]"
                    size={28}
                  />

                </div>

                <div>

                  <h2 className="text-3xl font-bold">
                    Profile Information
                  </h2>

                  <p className="text-zinc-500 mt-1">
                    Update your account details.
                  </p>

                </div>

              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Name */}
                <div>

                  <label className="text-zinc-400 text-sm block mb-3">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={
                      handleChange
                    }
                    className="
                    w-full
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

                </div>

                {/* Email */}
                <div>

                  <label className="text-zinc-400 text-sm block mb-3">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={
                      handleChange
                    }
                    className="
                    w-full
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

                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                  bg-[#C08B5C]
                  hover:bg-[#d49d6d]
                  text-black
                  px-6
                  py-4
                  rounded-2xl
                  font-semibold
                  transition-all
                  "
                >

                  {loading
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </form>

            </div>

            {/* Preferences */}
            <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-[#C08B5C]/10 flex items-center justify-center">

                  <CreditCard
                    className="text-[#C08B5C]"
                    size={28}
                  />

                </div>

                <div>

                  <h2 className="text-3xl font-bold">
                    Preferences
                  </h2>

                  <p className="text-zinc-500 mt-1">
                    Customize your experience.
                  </p>

                </div>

              </div>

              {/* Currency */}
              <div className="mb-6">

                <label className="text-zinc-400 text-sm block mb-3">
                  Currency
                </label>

                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(
                      e.target.value
                    )
                  }
                  className="
                  w-full
                  bg-[#181818]
                  border
                  border-zinc-800
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#C08B5C]
                  "
                >

                  <option>
                    INR
                  </option>

                  <option>
                    USD
                  </option>

                  <option>
                    EUR
                  </option>

                </select>

              </div>

              {/* Theme */}
              <div className="flex items-center justify-between py-5 border-t border-zinc-900">

                <div className="flex items-center gap-4">

                  <Moon
                    className="text-[#C08B5C]"
                  />

                  <div>

                    <h3 className="font-semibold">
                      Dark Mode
                    </h3>

                    <p className="text-zinc-500 text-sm">
                      Toggle dashboard theme.
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setDarkMode(
                      !darkMode
                    )
                  }
                  className={`
                  w-14
                  h-8
                  rounded-full
                  relative
                  transition-all

                  ${
                    darkMode
                      ? "bg-[#C08B5C]"
                      : "bg-zinc-700"
                  }
                  `}
                >

                  <div
                    className={`
                    absolute
                    top-1
                    w-6
                    h-6
                    rounded-full
                    bg-white
                    transition-all

                    ${
                      darkMode
                        ? "left-7"
                        : "left-1"
                    }
                    `}
                  />

                </button>

              </div>

              {/* Notifications */}
              <div className="flex items-center justify-between py-5 border-t border-zinc-900">

                <div className="flex items-center gap-4">

                  <Bell
                    className="text-[#C08B5C]"
                  />

                  <div>

                    <h3 className="font-semibold">
                      Notifications
                    </h3>

                    <p className="text-zinc-500 text-sm">
                      Receive alerts and updates.
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setNotifications(
                      !notifications
                    )
                  }
                  className={`
                  w-14
                  h-8
                  rounded-full
                  relative
                  transition-all

                  ${
                    notifications
                      ? "bg-[#C08B5C]"
                      : "bg-zinc-700"
                  }
                  `}
                >

                  <div
                    className={`
                    absolute
                    top-1
                    w-6
                    h-6
                    rounded-full
                    bg-white
                    transition-all

                    ${
                      notifications
                        ? "left-7"
                        : "left-1"
                    }
                    `}
                  />

                </button>

              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">

            {/* Security */}
            <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-[#C08B5C]/10 flex items-center justify-center">

                  <Shield
                    className="text-[#C08B5C]"
                    size={28}
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Security
                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">
                    Protect your account.
                  </p>

                </div>

              </div>

              <button
                className="
                w-full
                bg-[#181818]
                border
                border-zinc-800
                hover:border-[#C08B5C]
                rounded-2xl
                px-5
                py-4
                transition-all
                text-left
                "
              >
                Change Password
              </button>

            </div>

            {/* Logout */}
            <div className="bg-[#111111] border border-zinc-900 rounded-3xl p-8">

              <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">

                  <LogOut
                    className="text-red-400"
                    size={28}
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Logout
                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">
                    Sign out of your account.
                  </p>

                </div>

              </div>

              <button
                onClick={
                  handleLogout
                }
                className="
                w-full
                bg-red-500/10
                hover:bg-red-500/20
                text-red-400
                rounded-2xl
                px-5
                py-4
                transition-all
                font-semibold
                "
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}