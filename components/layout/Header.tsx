"use client";

import Link from "next/link";
import { FaShoppingCart, FaBoxOpen, FaUser, FaSearch, FaBars } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { items } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cosmic-bg2 text-white shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo + Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/home" className="text-orange-400 font-extrabold text-2xl tracking-wide hover:text-orange-300 transition">
            🚀 CosmicOnlines
          </Link>
          <button
            className="lg:hidden text-white text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Search Bar (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden lg:flex items-center gap-2 flex-grow max-w-xl mx-6"
        >
          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full outline-none bg-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 transition"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
            aria-label="Submit search"
          >
            <FaSearch />
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="flex items-center gap-2 hover:text-orange-300 transition">
            <FaBoxOpen /> Products
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:text-orange-300 transition relative">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold rounded-full px-2 shadow-md">
                {cartCount}
              </span>
            )}
            Cart
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/buyer/auth" className="flex items-center gap-2 hover:text-orange-300 transition">
              <FaUser /> Buyer Login
            </Link>
            <Link href="/seller/auth/login" className="flex items-center gap-2 hover:text-orange-300 transition">
              <FaUser /> Seller Login
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden px-6 pb-4 pt-4 space-y-4 text-sm font-medium border-t border-glass bg-cosmic-bg2 backdrop-blur-md"
          >
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full outline-none bg-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-orange-500 transition"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                aria-label="Submit search"
              >
                <FaSearch />
              </button>
            </form>
            <Link href="/products" className="block hover:text-orange-300 transition flex items-center gap-2">
              <FaBoxOpen /> Products
            </Link>
            <Link href="/cart" className="block hover:text-orange-300 transition flex items-center gap-2 relative">
              <FaShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-[10px] font-bold rounded-full px-2 shadow-md">
                  {cartCount}
                </span>
              )}
              Cart
            </Link>
            <Link href="/buyer/auth" className="block hover:text-orange-300 transition flex items-center gap-2">
              <FaUser /> Buyer Login
            </Link>
            <Link href="/seller/auth/login" className="block hover:text-orange-300 transition flex items-center gap-2">
              <FaUser /> Seller Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
