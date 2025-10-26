"use client";

import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* 🌌 Icon */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-full shadow-md group-hover:scale-105 transition-transform">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2 7h7l-5.5 4 2 7-5.5-4-5.5 4 2-7-5.5-4h7z" />
        </svg>
      </div>

      {/* 🪐 Text */}
      <span className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
        CosmiCom
      </span>
    </Link>
  );
};

export default Logo;
