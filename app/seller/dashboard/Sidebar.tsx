"use client";
import { motion } from "framer-motion";
import useDashboard from "@/context/DashboardContext"; // ✅ fixed import

export default function Sidebar() {
  const { activeSection, setActiveSection } = useDashboard();

  const items = [
    { name: "Store Setup", key: "StoreSetup", icon: "🏪" },
    { name: "Theme & Branding", key: "Theme", icon: "🎨" },
    { name: "Store Preview", key: "StorePreview", icon: "👁️" },
    { name: "Products", key: "Products", icon: "📦" },
    { name: "Product Wizard (AI)", key: "SellerToolsModal", icon: "🧠" },
    { name: "Quick Stats", key: "QuickStats", icon: "📊" },
    { name: "Analytics", key: "Analytics", icon: "📈" },
    { name: "AI Helper", key: "AIHelper", icon: "🤖" },
    { name: "AI Suggestions", key: "AISuggestions", icon: "🧠" },
    { name: "Publish Store", key: "Publish", icon: "🔒" },
    { name: "Billing & Subscription", key: "Billing", icon: "💳" },
    { name: "Marketing Tools", key: "Marketing", icon: "📣" },
    { name: "Referral Program", key: "Referral", icon: "🔗" },
    { name: "Social Integrations", key: "SellerIntegrations", icon: "🌐" },
    { name: "Legal Info", key: "Legal", icon: "📜" },
    { name: "Shipping", key: "Shipping", icon: "🚚" },
    { name: "Support Chat", key: "SellerSupport", icon: "💬" },
    { name: "Seller Roadmap", key: "SellerRoadmap", icon: "🗺️" },
    { name: "Calendar", key: "SellerCalendar", icon: "📅" },
    { name: "Wallet", key: "SellerWallet", icon: "👛" },
    { name: "Feedback & Ratings", key: "SellerFeedback", icon: "⭐" },
    { name: "Cosmic Addons", key: "CosmicAddons", icon: "🔮" },
    { name: "Notifications", key: "SellerNotifications", icon: "🛎️" },
  ];

  return (
    <aside className="w-72 bg-white/90 backdrop-blur-xl border-r border-gray-200 shadow-xl flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">
          Hybrid Seller 🚀
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage your store with ease</p>
      </div>

      <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
        {items.map((item) => (
          <motion.button
            key={item.key}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveSection(item.key)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium transition-all ${
              activeSection === item.key
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100"
            }`}
          >
            <span>{item.icon}</span> {item.name}
          </motion.button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button className="w-full text-sm text-gray-600 hover:text-red-600 font-medium">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}
