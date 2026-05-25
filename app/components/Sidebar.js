"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Wallet,
  Tags,
  Settings,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

  const menu = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Transactions",
      icon: Receipt,
      path: "/transactions",
    },
    {
      name: "Analytics",
      icon: PieChart,
      path: "/analytics",
    },
    {
      name: "Accounts",
      icon: Wallet,
      path: "/accounts",
    },
    {
      name: "Categories",
      icon: Tags,
      path: "/categories",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  return (

    <div className="w-72 bg-[#0b0b0c] border-r border-zinc-900 h-screen sticky top-0 flex flex-col">

      {/* Logo */}

      <div className="px-8 py-8 border-b border-zinc-900">

        <h1 className="text-4xl font-bold text-white tracking-tight">

          Go<span className="text-[#C08B5C]">Track</span>

        </h1>

      </div>

      {/* Menu */}

      <div className="flex-1 px-4 py-8 space-y-3">

        {menu.map((item) => {

          const Icon = item.icon;

          const isActive = pathname === item.path;

          return (

            <Link
              key={item.name}
              href={item.path}
              className={`

                group
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-300
                relative
                overflow-hidden

                ${isActive
                  ? "bg-[#18181b] text-white border border-[#C08B5C]/30 shadow-[0_0_20px_rgba(192,139,92,0.08)]"
                  : "text-zinc-400 hover:bg-[#141414] hover:text-white"
                }

              `}
            >

              {/* Left Accent Bar */}

              {isActive && (

                <div className="absolute left-0 top-0 h-full w-1 bg-[#C08B5C] rounded-r-full" />

              )}

              {/* Icon */}

              <div
                className={`

                  transition-all

                  ${isActive
                    ? "text-[#C08B5C] scale-110"
                    : "text-zinc-500 group-hover:text-white"
                  }

                `}
              >

                <Icon size={22} />

              </div>

              {/* Text */}

              <span className="text-[17px] font-medium tracking-wide">

                {item.name}

              </span>

            </Link>
          );
        })}

      </div>

      {/* Bottom User */}

      <div className="p-5 border-t border-zinc-900">

        <div className="bg-[#141414] rounded-2xl p-4 flex items-center gap-4">

          <div className="w-12 h-12 rounded-full bg-[#C08B5C] flex items-center justify-center text-black font-bold text-lg">

            A

          </div>

          <div>

            <p className="text-white font-semibold">
              Aryan
            </p>

            <p className="text-zinc-500 text-sm">
              Premium User
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}