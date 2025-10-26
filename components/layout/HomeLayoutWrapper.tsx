"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function HomelayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBuyerDashboard = pathname?.startsWith("/buyer/dashboard") ?? false;

  return (
    <>
      {/* 🌠 Header (Hide only on Buyer Dashboard) */}
      {!isBuyerDashboard && <Header />}

      {/* 🪐 Main Layout Container */}
      <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
        {children}
      </main>

      {/* 🌌 Footer (Hidden in Buyer Dashboard) */}
      {!isBuyerDashboard && (
        <footer className="mt-20 px-8 py-12 bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-300">
          {/* Top: Logo + Nav Links */}
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-700 pb-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-orange-500">CosmicOnlines</h2>
              <p className="text-sm text-gray-400 mt-2">
                Empowering creators and sellers across the galaxy 🌌
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-6 font-medium">
              <Link href="/products" className="hover:text-orange-400 transition">Products</Link>
              <Link href="/cart" className="hover:text-orange-400 transition">Cart</Link>
              <Link href="/seller" className="hover:text-orange-400 transition">Become Seller</Link>
              <Link href="/buyer/auth" className="hover:text-orange-400 transition">Login</Link>
            </div>
          </div>

          {/* Payment Info (Text Only) */}
          <div className="flex justify-center items-center gap-6 py-8 text-gray-400 font-medium">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>PayPal</span>
            <span>Stripe</span>
          </div>

          {/* Bottom */}
          <div className="text-center text-sm text-gray-500 mt-6">
            © {new Date().getFullYear()} CosmicOnlines — All rights reserved.
          </div>
        </footer>
      )}
    </>
  );
}
