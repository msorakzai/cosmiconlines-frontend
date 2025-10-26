"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SellerContext } from "@/context/SellerContext";

// Lazy load all sections
const SellerWelcome = lazy(() => import("./sections/SellerWelcome"));
const StoreChecklist = lazy(() => import("./sections/StoreChecklist"));
const StoreRewards = lazy(() => import("./sections/StoreRewards"));
const StoreCategory = lazy(() => import("./sections/StoreCategory"));
const StoreDetail = lazy(() => import("./sections/StoreDetail"));
const StoreModel = lazy(() => import("./sections/StoreModel"));
const StoreBranding = lazy(() => import("./sections/StoreBranding"));
const StoreContact = lazy(() => import("./sections/StoreContact"));
const StoreCurrency = lazy(() => import("./sections/StoreCurrency"));
const StoreShipping = lazy(() => import("./sections/StoreShipping"));
const StoreDelivery = lazy(() => import("./sections/StoreDelivery"));
const StorePayment = lazy(() => import("./sections/StorePayment"));
const Wallet = lazy(() => import("./sections/Wallet"));
const StorePreview = lazy(() => import("./sections/StorePreview"));
const StoreEdit = lazy(() => import("./sections/StoreEdit"));
const StoreManager = lazy(() => import("./sections/StoreManager"));

// ---- Subcomponent wrapped with Suspense ----
function DashboardContent() {
  const searchParams = useSearchParams();
  const [sellerId, setSellerId] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Welcome");
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const storeId = searchParams?.get("id") || "";

  useEffect(() => {
    const id =
      typeof window !== "undefined" ? localStorage.getItem("sellerId") || "" : "";
    setSellerId(id);
    setLoading(false);
  }, []);

  useEffect(() => {
    const tab = searchParams?.get("tab");
    if (tab) setActiveSection(tab);
  }, [searchParams]);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const renderSection = () => {
    switch (activeSection) {
      case "Welcome":
        return <SellerWelcome />;
      case "Checklist":
        return <StoreChecklist />;
      case "Rewards":
        return <StoreRewards />;
      case "Category":
        return <StoreCategory />;
      case "Details":
        return <StoreDetail />;
      case "Model":
        return <StoreModel />;
      case "Branding":
        return <StoreBranding />;
      case "Contact":
        return <StoreContact />;
      case "Currency":
        return <StoreCurrency />;
      case "Shipping":
        return <StoreShipping />;
      case "Delivery":
        return <StoreDelivery />;
      case "Payment":
        return <StorePayment storeId={storeId} />;
      case "Wallet":
        return <Wallet storeId={storeId} />;
      case "Preview":
        return <StorePreview storeId={storeId} />;
      case "Edit":
        return <StoreEdit storeId={storeId} />;
      case "Manager":
        return <StoreManager />;
      default:
        return <SellerWelcome />;
    }
  };

  const sections = [
    { key: "Welcome", name: "👋 Welcome" },
    {
      name: "🧩 Setup Tools",
      children: [
        { key: "Checklist", name: "🧩 Setup Checklist" },
        { key: "Rewards", name: "🎁 Welcome Rewards" },
      ],
    },
    {
      name: "🏗️ Store Creation",
      children: [
        { key: "Category", name: "🧭 Store Category" },
        { key: "Details", name: "🏪 Store Details" },
        { key: "Model", name: "📦 Store Model" },
        { key: "Branding", name: "🎨 Store Branding" },
        { key: "Contact", name: "📞 Store Contact" },
        { key: "Currency", name: "💱 Store Currency" },
        { key: "Shipping", name: "🚚 Store Shipping" },
        { key: "Delivery", name: "🚚 Delivery Model" },
        { key: "Payment", name: "💰 Payment Method" },
        { key: "Wallet", name: "🧮 Seller Wallet" },
        { key: "Preview", name: "👁️ Store Preview" },
      ],
    },
    { key: "Manager", name: "🧮 Store Manager" },
  ];

  return (
    <SellerContext.Provider value={{ sellerId }}>
      <div className="min-h-screen flex bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Sidebar */}
        <aside className="w-72 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-orange-400">Cosmic Seller 🚀</h1>
            <p className="text-gray-400 text-sm mt-1">Seller Onboarding</p>
          </div>

          <nav className="flex-1 p-5 space-y-4 overflow-y-auto">
            {sections.map((item) =>
              item.children ? (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="w-full text-left px-4 py-2 text-gray-400 font-semibold hover:text-orange-400"
                  >
                    {item.name} {expandedMenus[item.name] ? "▾" : "▸"}
                  </button>
                  {expandedMenus[item.name] && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <motion.button
                          key={child.key}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setActiveSection(child.key);
                            window.history.replaceState(
                              null,
                              "",
                              `/seller/dashboard?tab=${child.key}`
                            );
                          }}
                          className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                            activeSection === child.key
                              ? "bg-orange-500 text-white shadow-md"
                              : "text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {child.name}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <motion.button
                  key={item.key}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveSection(item.key);
                    window.history.replaceState(
                      null,
                      "",
                      `/seller/dashboard?tab=${item.key}`
                    );
                  }}
                  className={`w-full px-4 py-2 rounded-lg font-medium ${
                    activeSection === item.key
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {item.name}
                </motion.button>
              )
            )}
          </nav>

          <div className="p-4 border-t border-gray-700">
            <button
              onClick={() => {
                localStorage.clear();
                document.cookie =
                  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/seller/auth/login";
              }}
              className="w-full text-sm text-gray-400 hover:text-red-400 font-medium"
            >
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="flex justify-between items-center bg-gray-800 shadow px-8 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              Dashboard / <span className="text-orange-400">{activeSection}</span>
            </h2>
          </header>

          <motion.section
            key={`section-${activeSection}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 bg-gray-900 p-8 overflow-y-auto"
          >
            {loading ? (
              <div className="text-gray-400 text-center py-10">
                🔄 Loading dashboard...
              </div>
            ) : (
              <Suspense fallback={<div className="text-gray-400">Loading section...</div>}>
                {renderSection()}
              </Suspense>
            )}
          </motion.section>
        </main>
      </div>
    </SellerContext.Provider>
  );
}

// Wrap page in Suspense for useSearchParams()
export default function SellerDashboardPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 p-10">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
