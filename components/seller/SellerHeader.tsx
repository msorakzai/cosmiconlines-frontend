import React from "react";
import { LogOut } from "lucide-react";

const SellerHeader: React.FC = () => {
  const storeName = "CosmicOnlines"; // Replace with dynamic store name if available

  const handleLogout = () => {
    // Add logout logic here (e.g. clear tokens, redirect)
    console.log("Logging out...");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="/avatar-placeholder.png"
          alt="Seller Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{storeName}</h1>
          <p className="text-sm text-gray-500">Seller Dashboard</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </header>
  );
};

export default SellerHeader;
