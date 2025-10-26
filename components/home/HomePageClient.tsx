"use client";

import ProductCard from "@/components/buyer/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { stores } from "@/data/stores";


interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  badge?: string;
  rating?: number;
}

interface SellerStore {
  id: string;
  name: string;
  tagline?: string;
  category?: string;
  subCategory?: string;
  theme?: string;
  region?: string;
  currency?: string;
  adminApproved?: boolean;
  logoUrl?: string;
  bannerUrl?: string;
  description?: string;
}

const products: Product[] = [
  // your real product list here
];

function getDeliveryEstimate(region: string): string {
  const estimates: Record<string, string> = {
    Pakistan: "2–4 days",
    USA: "5–7 days",
    UK: "4–6 days",
    India: "3–5 days",
  };
  return estimates[region] || "5–10 days";
}

export default function HomePageClient() {
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [sellerStores, setSellerStores] = useState<SellerStore[]>([]);

  const filteredProducts = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products;

  const categories = Array.from(new Set(products.map((p) => p.category)));

  useEffect(() => {
    // ✅ Use local JSON data instead of API
   setSellerStores(stores);

 }, []);

  return (
    <main className="flex flex-col gap-20 px-6 py-12 max-w-7xl mx-auto text-white">
      {/* 🚀 Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">🚀 CosmicOnlines Marketplace</h1>
        <p className="text-lg text-white/80 mb-4">
          Sell, manage your store and grow revenue. For Buyers: Explore, compare, and shop with ease — all in one platform.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/seller/dashboard">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">🧠 Go to Seller Dashboard</button>
          </Link>
          <Link href="/products">
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">🌌 Explore Marketplace</button>
          </Link>
        </div>
      </section>

      {/* 🌟 Featured Categories */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-orange-400 mb-6 text-center"
        >
          🌟 Featured Categories
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-5 rounded-xl text-center font-semibold hover:bg-orange-500/70 transition-colors cursor-pointer shadow-md ${
                categoryFilter === cat ? "bg-orange-500/70" : ""
              }`}
            >
              <div className="text-3xl mb-2">
                {cat === "Electronics"
                  ? "🔌"
                  : cat === "Gaming"
                  ? "🎮"
                  : cat === "Books"
                  ? "📚"
                  : cat === "Art"
                  ? "🎨"
                  : cat === "Home & Living"
                  ? "🏠"
                  : cat === "Fashion"
                  ? "👗"
                  : "📦"}
              </div>
              {cat}
            </div>
          ))}
          {categoryFilter && (
            <div
              onClick={() => setCategoryFilter("")}
              className="bg-red-500/70 px-4 py-3 rounded-xl text-center font-semibold cursor-pointer hover:bg-red-600 transition-colors"
            >
              Clear Filter ❌
            </div>
          )}
        </motion.div>
      </section>

      {/* 🔥 Trending Products */}
      <section>
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          🔥 Trending Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 🏪 Featured Seller Stores */}
      <section>
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          🏪 Featured Seller Stores
        </h2>
        {sellerStores.length === 0 ? (
          <p className="text-center text-gray-400">No stores available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sellerStores.map((store) => (
              <Link key={store.id} href={`/store/${store.id}`}>
                <div
                  className={`border rounded-xl p-4 shadow hover:shadow-md transition cursor-pointer ${
                    store.theme === "cosmic"
                      ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <h3 className="text-lg font-bold">{store.name}</h3>
                  <p className="text-sm mt-1">{store.description}</p>
                  {store.category && (
                    <span className="text-xs mt-2 inline-block text-orange-400 font-semibold">🏷️ {store.category}</span>
                  )}
                  {store.subCategory && (
                    <span className="text-xs mt-1 inline-block text-blue-400 font-semibold">📂 {store.subCategory}</span>
                  )}
                  {store.region && (
                    <span className="text-xs mt-1 inline-block text-green-400 font-semibold">🚚 Est. delivery: {getDeliveryEstimate(store.region)}</span>
                  )}
                  {store.currency && (
                    <span className="text-xs mt-1 inline-block text-yellow-400 font-semibold">💰 Prices in {store.currency}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 🚀 CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-2xl p-10 text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🚀 Ready to Sell?</h2>
        <p className="mb-6">Join thousands of stores and start selling your products today.</p>
        <Link href="/seller">
          <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-semibold">
            Become a Seller
          </button>
        </Link>
      </section>

      {/* 📜 Footer */}
      <footer className="text-center text-sm text-white/50 mt-20">
        <p>© 2025 CosmicOnlines. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2 flex-wrap">
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </footer>
    </main>
  );
}
