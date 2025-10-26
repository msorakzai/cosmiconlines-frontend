// src/app/layout.tsx
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";

export const metadata = {
  title: "CosmicOnlines — Hybrid Marketplace",
  description:
    "Explore comics, games, innovations. Sell your products and reach global buyers seamlessly.",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#1e1b4b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-tr from-orange-500 via-purple-700 to-indigo-900 text-white font-sans transition-colors duration-500">
        <CartProvider>
          <Header />
          <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
