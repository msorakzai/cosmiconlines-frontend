"use client";

import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaCcStripe } from "react-icons/fa";

export default function StoreFooter() {
  return (
    <footer className="bg-gray-900 text-white mt-20 px-6 py-8 rounded-t-xl shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Links */}
        <div className="flex gap-6 text-yellow-400 font-semibold">
          <a href="#" className="hover:text-yellow-300 transition">Products</a>
          <a href="#" className="hover:text-yellow-300 transition">Cart</a>
          <a href="#" className="hover:text-yellow-300 transition">Login</a>
        </div>

        {/* Payment Methods */}
        <div className="flex gap-4 text-3xl text-yellow-500">
          <FaCcVisa title="Visa" />
          <FaCcMastercard title="MasterCard" />
          <FaCcPaypal title="PayPal" />
          <FaCcAmex title="Amex" />
          <FaCcStripe title="Stripe" />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-6">
        © 2025 CosmicOnlines. All rights reserved.
      </div>
    </footer>
  );
}
