// src/components/store/SearchBar.tsx
"use client";

export default function SearchBar() {
  return (
    <div className="w-full max-w-md mx-auto my-2">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
