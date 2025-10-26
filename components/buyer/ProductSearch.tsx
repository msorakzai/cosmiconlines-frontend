"use client";

import { useState } from "react";

interface Props {
  onSearch: (query: string) => void;
}

export default function ProductSearch({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-10 flex gap-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 px-4 py-2 rounded-lg bg-transparent border border-yellow-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <button
        type="submit"
        className="px-6 py-2 rounded-lg bg-yellow-500 text-purple-900 font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-md"
      >
        Search
      </button>
    </form>
  );
}
