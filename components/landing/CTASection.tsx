"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#111827] via-[#1f2937] to-[#0b0f1a] text-center text-white relative overflow-hidden">
      {/* Animated glowing background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.15),transparent_70%)]"></div>

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-orbitron mb-6 text-purple-400 drop-shadow-lg">
          Become a Cosmic Seller 🌠
        </h2>
        <p className="text-gray-300 text-lg mb-10">
          Turn your creativity into stellar income. Join thousands of sellers trading across the galaxies. 💫
        </p>

        <Link
          href="/auth/signup"
          className="inline-block px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all cta-shimmer shadow-lg"
        >
          🚀 Launch Your Store
        </Link>
      </motion.div>
    </section>
  );
}
