"use client";

import {
  Bell,
  Search,
} from "lucide-react";

export default function Topbar({
  title,
  subtitle,
}) {

  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (
    <div className="
    sticky
    top-0
    z-50
    backdrop-blur-xl
    bg-black/70
    border-b
    border-zinc-900
    px-8
    py-6
    mb-8
    ">

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

        {/* LEFT */}
        <div>

          <h1 className="text-5xl font-bold tracking-tight">

            {title}

          </h1>

          <p className="text-zinc-500 mt-2 text-lg">

            {subtitle}

          </p>

          <p className="text-zinc-600 mt-2 text-sm">

            {today}

          </p>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="
          hidden
          md:flex
          items-center
          gap-3
          bg-[#181818]
          border
          border-zinc-800
          rounded-2xl
          px-5
          py-3
          min-w-[280px]
          ">

            <Search
              size={18}
              className="text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
              bg-transparent
              outline-none
              text-sm
              w-full
              placeholder:text-zinc-600
              "
            />

          </div>

          {/* Notification */}
          <button className="
          relative
          w-14
          h-14
          rounded-2xl
          bg-[#181818]
          border
          border-zinc-800
          flex
          items-center
          justify-center
          hover:border-[#C08B5C]
          transition-all
          ">

            <Bell
              size={22}
              className="text-zinc-300"
            />

            {/* Notification Dot */}
            <div className="
            absolute
            top-3
            right-3
            w-2.5
            h-2.5
            rounded-full
            bg-[#C08B5C]
            " />

          </button>

          {/* Profile */}
          <div className="
          flex
          items-center
          gap-4
          bg-[#181818]
          border
          border-zinc-800
          rounded-2xl
          px-4
          py-3
          ">

            <div className="
            w-12
            h-12
            rounded-full
            bg-[#C08B5C]
            flex
            items-center
            justify-center
            text-black
            font-bold
            text-lg
            ">

              A

            </div>

            <div className="hidden md:block">

              <p className="font-semibold">
                Aryan
              </p>

              <p className="text-zinc-500 text-sm">
                Premium User
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}