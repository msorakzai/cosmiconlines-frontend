"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface HeroBannerProps {
  exploreLink?: string; // default is /home
}

export default function HeroBanner({ exploreLink = "/home" }: HeroBannerProps) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-28 px-6 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-purple-600/10 to-blue-500/10 blur-3xl" />

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-6xl font-extrabold z-10"
      >
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
          CosmicOnlines
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg sm:text-xl max-w-2xl mt-6 text-gray-300 z-10"
      >
        Discover amazing products, connect with store's, and explore endless
        possibilities — all in one cosmic marketplace.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mt-10 z-10"
      >
        <Link href="products">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-md hover:shadow-orange-500/40 transition-all">
            🌌 Explore Marketplace
          </button>
        </Link>

        <Link href="/seller">
          <button className="px-6 py-3 border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-400 font-semibold rounded-full shadow-md transition-all">
            🚀 Become a Seller
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
