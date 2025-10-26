"use client";

import React from "react";
import useDashboard from "@/context/DashboardContext";


export default function Header() {
  // TypeScript-safe destructure
  const dashboard = useDashboard() || {};
  const activeSection = dashboard.activeSection || "Overview";

  return (
    <header className="flex justify-between items-center bg-white/70 backdrop-blur-md shadow-md px-8 py-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Dashboard / <span className="text-blue-600">{activeSection}</span>
      </h2>

      <div className="flex items-center space-x-4">
        <button className="relative">
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
          🔔
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">My Store</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
      </div>
    </header>
  );
}
