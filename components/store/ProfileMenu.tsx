"use client";

import { useState } from "react";
import Link from "next/link";
import { User, LogOut, LayoutDashboard, Store } from "lucide-react";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar / Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-2 rounded-full hover:opacity-90 transition"
      >
        <User className="w-5 h-5" />
        <span className="hidden md:inline text-sm font-medium">Seller</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          <Link
            href="/seller/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-500" />
            Dashboard
          </Link>

          <Link
            href="/seller/store"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
          >
            <Store className="w-4 h-4 text-indigo-500" />
            My Store
          </Link>

          <Link
            href="/seller/settings"
            className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
          >
            <User className="w-4 h-4 text-indigo-500" />
            Settings
          </Link>

          <button
            onClick={() => alert("Logged out!")}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm hover:bg-gray-100 w-full text-left"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
