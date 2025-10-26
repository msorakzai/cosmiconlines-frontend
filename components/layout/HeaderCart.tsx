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
    window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-cosmic-bg2 text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo + Toggle */}
        <div className="flex items-center gap-4">
          <Link href="/home" className="text-orange-500 font-bold text-2xl">
            CosmicOnlines.com
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
            className="flex-1 px-4 py-2 rounded-full outline-none bg-glass text-white placeholder-muted"
          />
          <button type="submit" className="p-2 rounded-full bg-orange-500 text-white" aria-label="Submit search">
            <FaSearch />
          </button>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href="/products" className="flex items-center gap-2 hover:text-cosmic-accent">
            <FaBoxOpen /> Products
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:text-cosmic-accent relative">
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/buyer/auth" className="flex items-center gap-2 hover:text-cosmic-accent">
            <FaUser /> Login
          </Link>
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
            className="lg:hidden px-6 pb-4 pt-4 space-y-4 text-sm font-medium border-t border-glass bg-cosmic-bg2"
          >
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search products..."
                aria-label="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full outline-none bg-glass text-white placeholder-muted"
              />
              <button type="submit" className="p-2 rounded-full bg-orange-500 text-white" aria-label="Submit search">
                <FaSearch />
              </button>
            </form>
            <Link href="/products" className="block hover:text-cosmic-accent">📦 Products</Link>
            <Link href="/cart" className="block hover:text-cosmic-accent">
              🛒 Cart ({cartCount})
            </Link>
            <Link href="/buyer/login" className="block hover:text-cosmic-accent">👤 Login</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
