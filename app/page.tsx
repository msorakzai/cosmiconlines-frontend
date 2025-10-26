"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaShoppingCart, FaStore, FaWallet, FaGlobe } from "react-icons/fa";
import { BsStars } from "react-icons/bs";

const floatingProducts = [
  { x: -150, y: -80, size: 48 },
  { x: 100, y: -120, size: 56 },
  { x: -80, y: 100, size: 40 },
  { x: 120, y: 80, size: 36 },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-hero text-white overflow-hidden">

      {/* 🌌 Background Stars */}
      <motion.div
        className="absolute top-10 left-10 text-white opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <BsStars size={64} />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-20 text-white opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      >
        <BsStars size={48} />
      </motion.div>

      {/* 🛒 Floating Products */}
      {floatingProducts.map((prod, idx) => (
        <motion.div
          key={idx}
          className="absolute text-white"
          style={{ top: "50%", left: "50%" }}
          animate={{ x: [prod.x, prod.x + 15, prod.x], y: [prod.y, prod.y + 15, prod.y], rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 6 + idx, ease: "easeInOut" }}
        >
          <FaShoppingCart size={prod.size} />
        </motion.div>
      ))}

      {/* 🚀 Hero Section */}
      <motion.h1
        className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🚀 CosmicOnlines Marketplace
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl max-w-3xl mb-12 relative z-10 text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Buy or sell products seamlessly. For Sellers: Manage your store and grow revenue. For Buyers: Explore, compare, and shop with ease — all in one platform.
      </motion.p>

      {/* 🧭 Hero CTA */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-16 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
      >
        <Link href="/seller/dashboard">
          <button className="px-8 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-full shadow-lg transition-all duration-300">
            🧠 Go to Seller Dashboard
          </button>
        </Link>
        <Link href="/marketplace">
          <button className="px-8 py-3 border-2 border-primary hover:bg-primary hover:text-white rounded-full font-semibold shadow transition-all duration-300">
            🌌 Explore Marketplace
          </button>
        </Link>
      </motion.div>

      {/* 🌟 Features Section */}
      <section className="w-full max-w-6xl mb-16 relative z-10">
        <motion.h2
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose CosmicOnlines?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: FaShoppingCart, title: "Smart Shopping", desc: "Browse millions of products with easy search and categories." },
            { icon: FaStore, title: "Manage Your Store", desc: "Upload products, manage inventory, and grow your business online." },
            { icon: FaWallet, title: "Wallet & Payments", desc: "Track earnings, payments, and seamless checkout experience." },
            { icon: FaGlobe, title: "Global Reach", desc: "Connect with buyers and sellers from around the world." },
          ].map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={idx}
              className="bg-card-bg p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 + idx * 0.1 }}
            >
              <Icon size={32} className="mb-4 text-primary" />
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <p className="text-gray-300 text-center">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔄 How It Works Section */}
      <section className="w-full max-w-5xl mb-16 relative z-10">
        <motion.h2 className="text-3xl font-bold mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}>
          How It Works
        </motion.h2>
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {[
            { step: 1, title: "List Products", desc: "Sellers upload items easily", icon: FaStore },
            { step: 2, title: "Browse & Buy", desc: "Buyers explore and order", icon: FaShoppingCart },
            { step: 3, title: "Earn & Enjoy", desc: "Sellers earn, buyers receive", icon: FaWallet },
          ].map(({ step, title, desc, icon: Icon }) => (
            <motion.div
              key={step}
              className="bg-card-bg p-6 rounded-2xl shadow-lg flex-1 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 + step * 0.2 }}
            >
              <Icon size={36} className="mb-4 text-primary" />
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <p className="text-gray-300 text-center">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🚀 Final CTA */}
      <motion.div className="flex flex-wrap justify-center gap-6 mb-16 relative z-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
        <Link href="/seller/register">
          <button className="px-8 py-3 bg-primary hover:bg-secondary text-white font-semibold rounded-full shadow-lg transition-all duration-300">
            🧠 Join as Seller
          </button>
        </Link>
        <Link href="/marketplace">
          <button className="px-8 py-3 border-2 border-primary hover:bg-primary hover:text-white rounded-full font-semibold shadow transition-all duration-300">
            🌌 Start Shopping
          </button>
        </Link>
      </motion.div>

      {/* Footer */}
      <footer className="text-gray-500 text-sm mt-16 relative z-10">
        © 2025 CosmicOnlines. All rights reserved. <br />
        About Us • Contact • Terms • Privacy
      </footer>

    </main>
  );
}
